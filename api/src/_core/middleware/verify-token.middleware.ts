import { Request, Response } from 'express';
import validator from 'validator';

import * as UserService from '../../user/user.service';

const VerifyTokenMiddleware = async (req: Request, res: Response, next: () => void) => {
  const {
    token,
    email,
  } = req.body;

  if (
    !email || (
      validator.isEmpty(email) || !validator.isEmail(email)
    ) || !token || (validator.isEmpty(token))
  ) {
    return res.status(400).send({
      message: 'There was a problem with the email or the token.',
    });
  }

  let user;

  try {
    user = await UserService.getUserByEmail(email, true);
    await UserService.VerifyToken(user.id, token);
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }

  next();
};

export default VerifyTokenMiddleware;
