import { ChangeEvent, FC, FormEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import validator from 'validator';
import debounce from 'lodash.debounce';
import { Form } from 'remix';

type UserFormProps = {
  handleSubmit: (e: FormEvent) => void;
  children?: ReactNode;
}

const UserCreateForm: FC<UserFormProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (validator.isEmail(email)) {
      verifyEmail(email);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const verifyEmail = useCallback(debounce(async (email) => {
    if (validator.isEmpty(email)) return false;

    const found = await fetch('/api/users/check-email', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    });
    const user = await found.json();

    if (user != null) {
      setError('This email already exists');
      setEmailValid(false);
    } else {
      setError(null);
      setEmailValid(true);
    }
  }, 500), []);

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className={error ? 'alert-alert' : ''}
          autoComplete={'' + Math.random()}
          name="email" />
        {error && <span className="error--message">{error}</span>}
      </div>
      <button type="submit" disabled={!emailValid}>Send Invite</button>
    </Form>
  );
};

export default UserCreateForm;