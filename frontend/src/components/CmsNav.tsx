import { FC } from 'react';
import useAuth from '../context/useAuth';

const CmsNav: FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="main-nav">
      Welcome, {user?.displayName}
      <button type="button" className="alternate" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default CmsNav;