import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../context/useAuth';
import AuthRoute from './AuthRoute';

const CmsLayout: FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthRoute>
      <>
        <button type="button" onClick={handleLogout}>Logout</button>
        <Outlet />
      </>
    </AuthRoute>
  )
}

export default CmsLayout;