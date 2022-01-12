import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BaseUser } from '../user/user.model';
import * as AuthService from './auth.service';

dotenv.config();

const generateAccessToken = (user: Partial<BaseUser>): string => (
  jwt.sign(user, process.env.FMS_SECRET as string, {
    // expiresIn: process.env.FMS_TOKEN_EXPIRE as string,
    expiresIn: '10s',
  })
);

const AuthRoutes = express.Router();

AuthRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.Login(email, password);

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.FMS_REFRESH_SECRET as string);

      res.cookie('jwt', accessToken, {
        httpOnly: true,
      });

      try {
        await AuthService.SaveRefresh(user.id, refreshToken);
      } catch (e) {
        return res.sendStatus(500);
      }

      return res.status(200).send({
        accessToken,
        refreshToken,
      });
    }

    res.status(401).send({
      message: 'Invalid email or password.',
    });
  } catch (e: any) {
    res.status(500).send({
      stacktrace: e.message,
    });
  }
});

AuthRoutes.delete('/logout', async (req: Request, res: Response) => {
  await AuthService.DeleteRefresh(req.body.token);
  res.sendStatus(204);
});

AuthRoutes.post('/token', async (req: Request, res: Response) => {
  const { token } = req.body;

  if (token === null || typeof token === 'undefined') return res.sendStatus(401);

  const tokenGood = await AuthService.GetRefresh(token);

  if (!tokenGood) return res.sendStatus(403);

  try {
    const decode = await jwt.verify(
      token,
      process.env.FMS_REFRESH_SECRET as string,
    ) as BaseUser;
    const accessToken = generateAccessToken({ id: decode.id, email: decode.email });

    return res.send({
      accessToken,
    });
  } catch (e) {
    return res.sendStatus(403);
  }
});

export default AuthRoutes;
