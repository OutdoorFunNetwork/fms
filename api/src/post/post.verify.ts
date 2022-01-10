import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

export const VerifySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.body;

  if (typeof slug === 'undefined' || validator.isEmpty(slug)) {
    return res.status(400).send({
      message: 'The slug is required!',
    });
  }

  if (!validator.isSlug(slug)) {
    return res.status(400).send({
      message: `${slug} is not a valid slug.`,
    });
  }

  next();
};

export const VerifyTitle = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;
  if (typeof title === 'undefined' || validator.isEmpty(title)) {
    return res.status(400).send({
      message: 'The title is required!',
    });
  }

  req.body.title = validator.escape(req.body.title);
  next();
};
