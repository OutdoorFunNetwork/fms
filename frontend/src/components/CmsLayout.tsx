import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import CmsNav from './CmsNav';

const CmsLayout: FC = () => (
  <AuthRoute>
    <div className="container container--cms">
      <CmsNav />
      <main className="content">
        <Outlet />
      </main>
    </div>
  </AuthRoute>
);

export default CmsLayout;
