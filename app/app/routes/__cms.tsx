import { FC, useState } from 'react';
import { LoaderFunction, Outlet, redirect, useLoaderData } from 'remix';
import CmsLayout from '~/components/CmsLayout';
import Toastr from '~/components/Toastr/Toastr';
import useToastContext from '~/hooks/useToast';
import { hasSession } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  let user;
  try {
    user = await hasSession(request);
  } catch {
    return redirect('/auth/login');
  }

  return user;
};

const cms: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const addToast: any = useToastContext();
  const user = useLoaderData();

  return (
    <CmsLayout user={user}>
      <button onClick={() => addToast({ title: 'Test', message: 'hello', type: 'success' })}>Open Toast</button>
      <Outlet context={user} />
    </CmsLayout>
  )
};

export default cms;
