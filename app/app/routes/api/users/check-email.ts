import { ActionFunction } from 'remix';
import userService from '~/utils/services/user.service';

export const action: ActionFunction = async ({ request }) => {
  const { email } = await request.json();
  const user = await userService.getUserByEmail(email);

  return user || null;
};