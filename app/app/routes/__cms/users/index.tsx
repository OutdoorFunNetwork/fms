import { FC, useState } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import Modal from '~/components/Modal/Modal';
import { Pagination } from '~/utils/models/Pagination';
import { User } from '~/utils/models/User';
import UserService from '~/utils/services/user.service';

export const loader: LoaderFunction = async () => {
  return await UserService.list();
}

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Users | ${parentsData.root.baseTitle}` });

const Users: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const record: { data: User[], pagination: Pagination } = useLoaderData();

  const handleModalClose = (e: any) => {
    e.preventDefault();

    setModalOpen(false);
  };

  return (
    <>
      <h1>Users</h1>
      <button type="button" onClick={() => setModalOpen(true)}>Open</button>
      <ul>
        {
          record.data.map(u => (
            <li key={u.id}>{u.displayName}</li>
          ))
        }
      </ul>
      <Modal 
        isOpen={modalOpen}
        close={handleModalClose}
      />
    </>
  )
};

export default Users;
