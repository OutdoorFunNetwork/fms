import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import CmsLayout from './components/CmsLayout';
import { AuthProvider } from './context/useAuth';
import Login from './pages/auth/login';

const Blocked: FC = () => (
  <>
    <h1>Blocked Page!</h1>
  </>
);

export const Paths: FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/auth/login" element={<Login />} />

      <Route
        path="/"
        element={<CmsLayout />}>
          <Route path="/" element={<Blocked />} />
      </Route>
    </Routes>
  </AuthProvider>
);
