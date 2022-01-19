import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../models/User';
import authService from '../services/auth.service';

type AuthContextType = {
  user?: User;
  loading: boolean;
  errors?: string[];
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setInitialLoading] = useState<boolean>(true);

  const router = useNavigate();
  const { pathname, state }: { pathname: string, state: any } = useLocation();

  const redirectTo = state?.from?.pathname || '/cms';
  // If the page changes reset the errors.
  useEffect(() => {
    if (errors) setErrors(null);
  }, [pathname]);

  /*
  * Lets check to see if there is an actively logged in user.
  * At the end just let the app know initial load is done.
  */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const { data: apiUser } = await authService.me();
        setUser(apiUser);
      } catch (e: any) {
        return;
      } finally {
        setInitialLoading(false);
      }
    })();
    return () => controller?.abort();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);

    try {
      await authService.login(email, password);
      const { data: apiUser } = await authService.me();

      setUser(apiUser);
      setLoading(false);
      router(redirectTo, {
        replace: true,
      });
    } catch (e: any) {
      const { response } = e;
      const { data } = response;

      setLoading(false);
      setErrors(data.errors);
    } finally {
      setLoading(false);
    }
  }, [router, redirectTo]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(undefined);
    router('/auth/login', {
      replace: true,
    });
  }, [router]);

  const memo = useMemo(() => ({
    user,
    loading,
    errors,
    login,
    logout,
  }), [user, loading, errors, login, logout]);

  return (
    <AuthContext.Provider value={memo}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
