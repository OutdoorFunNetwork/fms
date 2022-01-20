import { createCookieSessionStorage, redirect } from 'remix';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: '__fms',
    httpOnly: true,
    secure: process.env.ENV !== 'dev',
    sameSite: 'strict',
    secrets: [process.env.FMS_SECRET as string],
    path: '/',
  }
});

export const hasSession = async (request: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  if (!session.has('user')) throw new Error('No session.');

  return session.get('user');
}

export { getSession, commitSession, destroySession, };
