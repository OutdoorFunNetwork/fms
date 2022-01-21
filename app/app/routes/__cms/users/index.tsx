import { FC } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { User } from '~/utils/models/User';
import UserService from '~/utils/services/user.service';

export const loader: LoaderFunction = async () => {
  return await UserService.list();
}

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Users | ${parentsData.root.baseTitle}` });

const Users: FC = () => {
  const data: { users: User[], count: number } = useLoaderData();
  return (
    <>
      <h1>Users</h1>
      <ul>
        {
          data.users.map(u => (
            <li key={u.id}>{u.displayName}</li>
          ))
        }
      </ul>
    </>
  )
};

export default Users;
