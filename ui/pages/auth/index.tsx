import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Errors from '../../components/Errors';
import authService from '../../services/auth.service';

type AuthCreds = {
  email: string;
  password: string;
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
}

const Auth: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setError] = useState([]);
  const [status, setStatus] = useState('disabled');

  const valid = (): boolean => {
    return email.length > 0 && password.length > 0;
  }

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    let tokens: Tokens;

    try {
      tokens = await authService.login(email, password);

      router.push('/cms');
    } catch (e: any) {
      const { data } = e.response;

      setError(data.errors);
      setStatus('error');
    }
  };

  return (
    <>
      {
        status === 'error' && <Errors errors={errors} />
      }
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            autoComplete="new-password"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            disabled={status === 'submitting'}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={!valid() || status === 'submitting'}>Login!</button>
        </div>
      </form>
    </>
  )
};

export default Auth;
