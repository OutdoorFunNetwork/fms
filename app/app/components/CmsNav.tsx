import { CgFileDocument, CgUserList, CgList } from 'react-icons/cg';
import { Form, NavLink } from 'remix';
import { BaseUser } from '~/utils/services/auth.service';

type CmsNavType = {
  logoutFn: (e: any) => void;
  user: BaseUser;
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
        >
          <CgFileDocument />
          Our Posts
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? 'active' : ''
          }
        >
          <CgUserList />
          Our Users
        </NavLink>
        <a href="#" title="Our Categories">
          <CgList />
          Our Categories
        </a>
      </nav>
      <Form method="post">
        <button type="submit" className="logout" onClick={logoutFn}>Logout</button>
      </Form>
    </aside>
  );
};

export default CmsNav;
