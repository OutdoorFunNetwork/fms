import { NextPage } from 'next';
import { FormEvent } from 'react';

const Auth: NextPage = () => {
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email"/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
      </form>
    </>
  )
};

export default Auth;
