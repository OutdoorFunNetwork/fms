import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export const VerifyEmail = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
  } = req.body;

  if (
    !email || (validator.isEmpty(email) || !validator.isEmail(email))
  ) {
    return res.status(400).send({
      message: 'There was a problem with the email field.',
    });
  }
  next();
};

export const VerifyPasswords = (req: Request, res: Response, next: NextFunction) => {
  const {
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
  next();
};
