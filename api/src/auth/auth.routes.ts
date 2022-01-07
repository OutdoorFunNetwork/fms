import express, { Request, Response } from 'express';
import * as AuthService from './auth.service';

export const AuthRoutes = express.Router();

AuthRoutes.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.Login(email, password);

    if (user) {
      return res.status(200).send({
        message: 'Successful login!'
      });
    }

    res.status(401).send({
      message: 'Invalid email or password.'
    })
  } catch (e: any) {
    res.status(500).send({
      stacktrace: e.message,
    })
  }
});