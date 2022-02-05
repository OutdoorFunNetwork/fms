import { FC } from 'react';
import { User } from '~/utils/models/User';
import CmsNav from './CmsNav';
import Modal from './Modal/Modal';

type Props = {
  user: User;
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
