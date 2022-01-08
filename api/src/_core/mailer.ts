import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const SendMail = async (
  email: string,
  subject: string,
  body: string,
) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  });

  const main = {
    from: `"OFN" <outdoorfunnetwork@gmail.com>`,
    to: (process.env.ENV === 'dev') ? process.env.DEV_EMAIL : email,
    subject,
    html: body,
  };
  let msg;

  try {
    msg = await transport.sendMail(main);
  } catch (e: any) {
    return e;
  }

  return nodemailer.getTestMessageUrl(msg);
}