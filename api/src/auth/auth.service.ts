import pool from '../db';

export const Login = async (email: string, password: string): Promise<boolean> => {
  const { rows } = await pool.query(`
    SELECT * FROM users WHERE email = $1 AND password = crypt($2, password) AND active = true`,
    [email, password]
  );

  return rows.length > 0;
};