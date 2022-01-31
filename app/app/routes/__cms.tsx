import { FC, useState } from 'react';
import { LoaderFunction, Outlet, redirect, useLoaderData } from 'remix';
import CmsLayout from '~/components/CmsLayout';
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
  const user = useLoaderData();

  return (
    <CmsLayout user={user}>
      <Outlet context={user} />
    </CmsLayout>
  )
};

export default cms;
