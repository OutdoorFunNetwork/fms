import { FC } from 'react';
import CmsNav from './CmsNav';

import { BaseUser } from '~/utils/services/auth.service';

type Props = {
  user: BaseUser;
  children?: any;
};

const CmsLayout: FC<Props> = ({ children, user }: Props) => {
  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();

    await fetch('/api/logout', {
      method: 'POST',
    });

    window.location.href = '/auth/login';
  }
  return (
    <div className="container container--cms">
      <CmsNav
        user={user}
        logoutFn={handleLogout} />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default CmsLayout;
