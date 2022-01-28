import { FC } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Pagination } from '~/utils/models/Pagination';
import { User } from '~/utils/models/User';
import UserService from '~/utils/services/user.service';

export const loader: LoaderFunction = async () => {
  return await UserService.list();
}

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Users | ${parentsData.root.baseTitle}` });

const Users: FC = () => {
  const record: { data: User[], pagination: Pagination } = useLoaderData();
  return (
    <>
      <h1>Users</h1>
      <ul>
        {
          record.data.map(u => (
            <li key={u.id}>{u.displayName}</li>
          ))
        }
      </ul>
    </>
  )
};

export default Users;
