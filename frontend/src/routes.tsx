import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import CmsLayout from './components/CmsLayout';
import { AuthProvider } from './context/useAuth';
import Login from './pages/auth/login';
import Posts from './pages/posts';
import Users from './pages/users';

const Paths: FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/auth/login" element={<Login />} />

      <Route
        path="/"
        element={<CmsLayout />}>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default Paths;
