import express, { Request, Response } from 'express';
import validator from 'validator';
import { SendMail } from '../_core/mailer';

import * as UserService from './user.service';

export const UserRoutes = express.Router();

UserRoutes.post('/', async (req: Request, res: Response) => {
  const {
    email
  } = req.body;

  if (
    !email ||
    (
      validator.isEmpty(email) ||
      !validator.isEmail(email)
    )
  ) {
    return res.status(400).send({
      message: 'There was a problem with the email field.'
    });
  }

  let newUser;

  try {
    newUser = await UserService.StartCreateUser(email);
  } catch (e: any) {
    console.log(e);
    return res.status(e.status || 500).send({ message: e.message });
  }

  await SendMail(
    newUser.email,
    `Finish setting up your account!`,
    `Finish setting up your account with OFN by clicking <a href="http://localhost:3000/">here!</a>`
  );

  return res.status(200).send({
    status: 200,
    message: `User creation started, sent an email to ${newUser.email} to finish setting up.`,
  });
});

UserRoutes.patch(`/finish/:id`, async (req: Request, res: Response) => {
  return res.status(200).send({
    status: 200,
    message: 'User finished setting up profile!'
  });
});
