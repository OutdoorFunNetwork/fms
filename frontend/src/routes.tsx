import { FC } from 'react';
import { Routes, Route } from "react-router-dom";
import App from './App';
import Login from './pages/auth/login';

const Blocked: FC = () => <h1>Blocked Page!</h1>;

export const Paths: FC = () => (
  <Routes>
    <Route path="/" element={<App />} />

    <Route path="/auth/login" element={<Login />} />

    <Route path="/blocked" element={<Blocked />} />
  </Routes>
);
