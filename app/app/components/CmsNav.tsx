import { CgFileDocument, CgUserList, CgList } from 'react-icons/cg';
import { Form, NavLink } from 'remix';
import { User } from '~/utils/models/User';

type CmsNavType = {
  logoutFn: (e: any) => void;
  user: User;
}

const CmsNav = ({ logoutFn, user }: CmsNavType): JSX.Element => {
  return (
    <aside className="cms-sidebar">
      <span className="user-info">Welcome, {user.displayName}</span>
      <nav className="cms-nav">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? 'active' : ''
          }
          title="Our Posts"
        >
          <CgFileDocument />
          Our Posts
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? 'active' : ''
          }
          title="Our Users"
        >
          <CgUserList />
          Our Users
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? 'active' : ''
          }
          title="Our Categories"
        >
          <CgList />
          Our Categories
        </NavLink>
      </nav>
      <Form method="post">
        <button type="submit" className="logout" onClick={logoutFn}>Logout</button>
      </Form>
    </aside>
  );
};

export default CmsNav;
