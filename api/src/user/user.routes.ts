import express, { Request, Response } from 'express';
import validator from 'validator';

import {
  SendMail,
  VerifyEmail,
  VerifyTokenMiddleware,
  VerifyPasswords,
} from '../_core';
import * as UserService from './user.service';

const UserRoutes = express.Router();

UserRoutes.post('/', VerifyEmail, async (req: Request, res: Response) => {
  const {
    email,
  } = req.body;

  let newUser;

  try {
    newUser = await UserService.StartCreateUser(email);
  } catch (e: any) {
    return res.status(e.status || 500).send({ message: e.message });
  }

  await SendMail(
    newUser.email,
    'Finish setting up your account!',
    `Finish setting up your account with OFN by clicking <a href="http://localhost:3000/user/finish?token=${newUser.token}&email=${newUser.email}">here!</a>`,
  );

  return res.status(200).send({
    status: 200,
    message: `User creation started, sent an email to ${newUser.email} to finish setting up.`,
  });
});

UserRoutes.post('/verify-token', async (req: Request, res: Response) => {
  const {
    email,
    token,
  } = req.body;

  if (
    !email
    || (
      validator.isEmpty(email)
      || !validator.isEmail(email)
    )
    || !token || (validator.isEmpty(token))
  ) {
    return res.status(400).send({
      message: 'There was a problem with the email or the token.',
    });
  }

  let user;
  let tokenQ;

  try {
    user = await UserService.getUserByEmail(email, true);
    tokenQ = await UserService.VerifyToken(user.id, token);
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }

  if (tokenQ) {
    return res.send(200);
  }

  res.status(400).send({ message: false });
});

UserRoutes.patch('/finish/:id', VerifyTokenMiddleware, VerifyPasswords, async (req: Request, res: Response) => {
  /*
    email: string;
    displayName?: string;
    location?: string;
    avatar?: string;
    bio?: string;
    primaryActivity?: string;
    active: boolean;
  */
  const id = parseInt(req.params.id, 10);

  try {
    await UserService.FinishUser(id, req.body);
  } catch (e) {
    throw new Error('Something went wrong.');
  }

  return res.status(200).send({
    status: 200,
    message: 'User finished setting up profile!',
  });
});

export default UserRoutes;
