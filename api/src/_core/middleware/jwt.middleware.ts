import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers['x-access-token'] as string;
  // const token = authorization?.split(' ')[1];
  const token = req.cookies.jwt;

  if (token === null || typeof token === 'undefined') return res.sendStatus(401);

  let decode;

  try {
    decode = await jwt.verify(token, process.env.FMS_SECRET as string);
  } catch (e) {
    return res.sendStatus(403);
  }

  res.locals.user = decode;
  next();
};

export default jwtMiddleware;
