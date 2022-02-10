import { FC, useEffect, useState } from 'react';
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition
} from 'remix';
import validator from 'validator';

import Modal from '~/components/Modal/Modal';
import UserCreateForm from '~/components/UserCreateForm';
import SendMail from '~/utils/mail.server';
import { Pagination } from '~/utils/models/Pagination';
import { User } from '~/utils/models/User';
import UserService from '~/utils/services/user.service';

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case 'POST':
      const formData = await request.formData();
      let user;

      try {
        user = await UserService.StartCreateUser(formData.get('email') as string);
      } catch (e: any) {
        return json({
          message: e.message,
          prevEmail: formData.get('email'),
        }, e.status);
      }

      await SendMail(
        user.email!,
        'Finish setting up your account!',
        `Finish setting up your account with OFN by clicking <a href="${process.env.FMS_URL}/auth/create-account?token=${user.token}&email=${user.email}">here!</a>`,
      );

      // return { error: null, user };
      return redirect('/users');
      break;
  }
}

export const loader: LoaderFunction = async () => {
  return await UserService.list();
}

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Users | ${parentsData.root.baseTitle}` });

const Users: FC = () => {
  const record: { data: User[], pagination: Pagination } = useLoaderData();

  const [modalOpen, setModalOpen] = useState(false);

  const transition = useTransition();
  const submitFn = useSubmit();

  const handleModalClose = (e: any) => {
    e.preventDefault();

    setModalOpen(false);
  };

  const handleInvite = (e: any) => {
    e.preventDefault();

    setModalOpen(false);
    submitFn(e.currentTarget);
  };

  return (
    <>
      <h1>Users</h1>
      <button type="button" onClick={() => setModalOpen(true)}>Add User</button>
      <ul>
        {
          transition.submission && transition.submission.formData ?
            <li>{transition.submission.formData.get('email')}</li> : null
        }
        {
          record.data.map(u => (
            <li key={u.id}>{u.email}</li>
          ))
        }
      </ul>
      <Modal
        isOpen={modalOpen}
        close={handleModalClose}
      >
        <UserCreateForm handleSubmit={handleInvite} />
      </Modal>
    </>
  )
};

export default Users;
