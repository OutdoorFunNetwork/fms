import { FC, FormEvent, useState } from 'react';
import Errors from '../../components/Errors';
import useAuth from '../../context/useAuth';

const Login: FC = () => {
  const { login, loading, errors } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const valid = (): boolean => {
    return email.length > 0 && password.length > 0;
  }

  const handleOnSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="container container--user">
      <div className="user-form">
        <h2>Sign In</h2>
        <p>
          Welcome to the FMS, your adventure post awaits!
        </p>
        {
          errors && <Errors errors={errors} />
        }
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={!valid() || loading}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
