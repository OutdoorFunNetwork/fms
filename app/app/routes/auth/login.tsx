import { FC, useState } from 'react';
import { ActionFunction, Form, json, LoaderFunction, redirect, useLoaderData } from 'remix';
import { commitSession, getSession } from '~/utils/session.server';
import { Login as TryLogin } from '~/utils/services/auth.service';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('user')) {
    return redirect('/');
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    }
  });
};

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const session = await getSession(
        request.headers.get("Cookie")
      );
      const form: FormData = await request.formData();
      const email: FormDataEntryValue | null = form.get('email')
      const password: FormDataEntryValue | null = form.get('password');

      const { user, rowCount } = await TryLogin(email as string, password as string);

      if (rowCount === 0) {
        session.flash('error', 'Invalid username or password.');

        return redirect('/auth/login', {
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        });
      }

      session.set('user', user);

      return redirect('/', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }
  };
};

export const meta = () => ({
  title: 'Login | Fun Management System',
});

const Login: FC = () => {
  const { error } = useLoaderData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const valid = (): boolean => email.length > 0 && password.length > 0;

  return (
    <div className="container container--user">
      <div className="user-form">
        <h2>Login</h2>
        <p>
          Welcome to the FMS, your adventure post awaits!
        </p>
        {
          error && <div className="error">{error}</div>
        }
        <Form method="post">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              // disabled={loading}
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
              // disabled={loading}
              required
            />
          </div>
          <div>
            <button type="submit" className="alternate" disabled={!valid()}>Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
