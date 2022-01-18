import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import CmsNav from './CmsNav';

const CmsLayout: FC = () => {
  return (
    <AuthRoute>
      <div className="container container--cms">
        <CmsNav />
        <Outlet />
      </div>
    </AuthRoute>
  )
}

export default CmsLayout;