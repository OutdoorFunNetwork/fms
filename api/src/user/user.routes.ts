import express, { Request, Response } from 'express';
import validator from 'validator';
import SendMail from '../_core/mailer';
import VerifyTokenMiddleware from '../_core/middleware/verify-token.middleware';

import * as UserService from './user.service';

const UserRoutes = express.Router();

UserRoutes.post('/', async (req: Request, res: Response) => {
  const {
    email,
  } = req.body;

  if (
    !email
    || (
      validator.isEmpty(email)
      || !validator.isEmail(email)
    )
  ) {
    return res.status(400).send({
      message: 'There was a problem with the email field.',
    });
  }

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

UserRoutes.patch('/finish/:id', VerifyTokenMiddleware, async (req: Request, res: Response) => {
  /*
    email: string;
    displayName?: string;
    location?: string;
    avatar?: string;
    bio?: string;
    primaryActivity?: string;
    active: boolean;
  */

  const {
    // eslint-disable-next-line no-unused-vars
    displayName,
    // eslint-disable-next-line no-unused-vars
    location,
    // eslint-disable-next-line no-unused-vars
    avatar,
    // eslint-disable-next-line no-unused-vars
    bio,
    // eslint-disable-next-line no-unused-vars
    primaryActivity,
    password,
    passwordConfirmation,
  } = req.body;

  if (!password || !passwordConfirmation) {
    return res.status(400).send({
      message: 'Missing passwords!',
    });
  }

  if (
    validator.isEmpty(password) || validator.isEmpty(passwordConfirmation)
  ) {
    return res.status(400).send({
      message: 'Password or confirm password is empty!',
    });
  }

  // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
  if (
    !validator.isStrongPassword(password)
  ) {
    return res.status(400).send({
      message: 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol!',
    });
  }

  if (
    password !== passwordConfirmation
  ) {
    return res.status(400).send({
      message: 'Passwords do not match!',
    });
  }

  return res.status(200).send({
    status: 200,
    message: 'User finished setting up profile!',
  });
});

export default UserRoutes;
