import { ActionFunction, json } from 'remix';
import { destroySession, getSession } from '~/utils/session.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  console.log(session.get('userId'));

  return json({ success: true }, {
    headers: {
      'Set-Cookie': await destroySession(session),
    }
  });
};