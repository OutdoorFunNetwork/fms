import { FC } from 'react';
import { CgFileDocument, CgUserList, CgList } from 'react-icons/cg';

import useAuth from '../context/useAuth';

const CmsNav: FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="cms-sidebar">
      <span className="user-info">Welcome, {user?.displayName}</span>
      <nav className="cms-nav">
        <a href="#" title="Our Posts">
          <CgFileDocument />
          Our Posts
        </a>
        <a href="#" title="Our Users">
          <CgUserList />
          Our Users
        </a>
        <a href="#" title="Our Categories">
          <CgList />
          Our Categories
        </a>
      </nav>
      <button type="button" className="logout" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default CmsNav;
