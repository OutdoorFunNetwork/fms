import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

const VerifySlug = (slug: string): string[] => {
  const errors: string[] = [];

  if (typeof slug === 'undefined' || validator.isEmpty(slug)) {
    errors.push('The slug is required.');
    // return res.status(400).send({
    //   message: 'The slug is required!',
    // });
  }

  if (!validator.isSlug(slug)) {
    errors.push(`${slug} is not a valid slug.`);
    // return res.status(400).send({
    //   message: `${slug} is not a valid slug.`,
    // });
  }

  return errors;
};

const VerifyTitle = (title: string): string[] => {
  const errors: string[] = [];

  if (typeof title === 'undefined' || validator.isEmpty(title)) {
    errors.push('The title is required.');
    // return res.status(400).send({
    //   message: 'The title is required!',
    // });
  }

  return errors;
};

export const FullValidate = async (req: Request, res: Response, next: NextFunction) => {
  const {
    slug,
    title,
  } = req.body;

  const errors = [
    ...VerifySlug(slug),
    ...VerifyTitle(title),
  ];

  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  req.body.title = validator.escape(req.body.title);

  next();
};

export default FullValidate;
