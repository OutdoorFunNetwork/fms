import { FC, useState } from 'react';
import { ActionFunction, Form, LoaderFunction, MetaFunction, useActionData, useLoaderData, useSubmit, useTransition } from 'remix';
import Modal from '~/components/Modal/Modal';
import useToastContext from '~/hooks/useToast';
import SendMail from '~/utils/mail.server';
import { Pagination } from '~/utils/models/Pagination';
import { User } from '~/utils/models/User';
import UserService from '~/utils/services/user.service';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let user;

  try {
    user = await UserService.StartCreateUser(formData.get('email') as string);
  } catch (e: any) {
    return { error: e.message, user: null };
  }

  await SendMail(
    user.email,
    'Finish setting up your account!',
    `Finish setting up your account with OFN by clicking <a href="http://localhost:3000/user/finish?token=${user.token}&email=${user.email}">here!</a>`,
  );

  return { error: null, user };
}

export const loader: LoaderFunction = async () => {
  return await UserService.list();
}

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Users | ${parentsData.root.baseTitle}` });

const Users: FC = () => {
  const record: { data: User[], pagination: Pagination } = useLoaderData();

  const [modalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState<User[]>(record.data);

  const submitFn = useSubmit();
  const actionData: any = useActionData();
  const addToast: any = useToastContext();

  const transition = useTransition();

  if (
    actionData != null && 
    actionData.error != null &&
    !transition.submission
  ) {
    addToast({
      message: actionData.error,
    })
  } else if (actionData != null && actionData.user != null) {
    setUserList([
      ...actionData.user,
      userList
    ])
  }

  const handleModalClose = (e: any) => {
    e.preventDefault();

    setModalOpen(false);
  };

  const handleInvite = (e: any) => {
    e.preventDefault();
    
    setModalOpen(false);
    submitFn(e.currentTarget, { replace: true });
  }

  return (
    <>
      <h1>Users {transition.state}</h1>
      <button type="button" onClick={() => setModalOpen(true)}>Open</button>
      <ul>
        {
          transition.submission && transition.submission.formData ? 
            <li>{transition.submission.formData.get('email')}</li> : null
        }
        {
          userList.map(u => (
            <li key={u.id}>{u.email}</li>
          ))
        }
      </ul>
      <Modal 
        isOpen={modalOpen}
        close={handleModalClose}
      >
        <Form method="post" onSubmit={handleInvite}>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" />
          </div>
          <button type="submit">Send Invite</button>
        </Form>
      </Modal>
    </>
  )
};

export default Users;
