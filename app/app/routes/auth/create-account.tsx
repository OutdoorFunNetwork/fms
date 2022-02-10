import { FC } from 'react';
import { ActionFunction, Form, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData } from 'remix';
import userService from '~/utils/services/user.service';
import { getSession } from '~/utils/session.server';
import validator from 'validator';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data: any = Object.fromEntries(formData);
  const errors: Record<string, string[]> = {};

  if (data.displayName == null || data.displayName === '') errors['displayName'] = ['Display name is required.'];
  if (data.password == null || data.password === '') errors['password'] = ['Password is required.'];
  if (data.confirm_password == null || data.confirm_password === '') errors['confirm_password'] = ['You have to confirm your password.'];

  if (!validator.isStrongPassword(data.password as string)) {
    errors['password'] = errors['password'] || [];
    errors['password'].push('That is not a strong password.');
  }

  if (data.password !== data.confirm_password) {
    errors['confirm_password'] = errors['confirm_password'] || [];
    errors['confirm_password'].push('Your passwords don\'t match');
  }

  if (Object.keys(errors).length > 0) return errors;
  const { id } = await userService.getUserByEmail(data.email as string);

  try {
    await userService.FinishUser(id, data);
  } catch (e: any) {
    throw new Response(e.message, { status: 400 });
  }

  return redirect('/auth/login');
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('user')) {
    return redirect('/');
  }

  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  if (token == null || email == null) throw new Response('Not found.', { status: 404 });

  const user = await userService.getUserByEmail(email);

  if (user == null) throw new Response('Not found.', { status: 404 });

  const t = await userService.VerifyToken(user.id, token);

  if (t == null) throw new Response('Not found.', { status: 404 });

  return {
    token,
    email
  };
}

export const meta: MetaFunction = ({ parentsData  }) => {
  return {
    title: `Finish your account | ${parentsData.root.baseTitle}`,
  };
};

const CreateAccount: FC = () => {
  const loaderData: { token: string; email: string; } = useLoaderData();
  const errors = useActionData();

  return (
    <div className="container container--user">
      <div className="user-form">
        <h2>Finish Your Account</h2>
        <p>
          Let's finish creating your account.
        </p>
        <Form method="post" action={`/auth/create-account?token=${loaderData.token}&email=${loaderData.email}`}>
          <div>
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              // disabled={loading}
              autoComplete="new-password"
            />
            {(errors && errors['displayName']) &&
              errors['displayName'].map((e: string) => <span className="error--message">{e}</span>)
            }
          </div>
          <hr />
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              // disabled={loading}
              autoComplete="new-password"
            />
            {(errors && errors['password']) &&
              errors['password'].map((e: string) => <span className="error--message">{e}</span>)
            }
          </div>
          <div>
            <label htmlFor="confirm_password">Password Confirmation:</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              // disabled={loading}
              autoComplete="new-password"
            />
            {(errors && errors['confirm_password']) &&
              errors['confirm_password'].map((e: string) => <span className="error--message">{e}</span>)
            }
          </div>
          <hr />
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              // disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="bio">About You:</label>
            <textarea
              name="bio"
              id="bio"
            ></textarea>
          </div>
          <div>
            <input type="hidden" value={loaderData.email} name="email" />
            <input type="hidden" value={loaderData.token} name="token" />
            <button type="submit">Create!</button>
          </div>
        </Form>
      </div>
    </div>
  )
};

export default CreateAccount;
