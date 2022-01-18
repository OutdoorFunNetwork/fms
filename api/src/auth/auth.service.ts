import { BaseUser } from '../user/user.model';
import pool from '../db';

export const GetMe = async (id: number): Promise<BaseUser> => {
  const { rows } = await pool.query(`
    SELECT
      u.id,
      u.email,
      ui.display_name as "displayName",
      ui.location,
      ui.avatar,
      ui.bio,
      ui.primary_activity as "primaryActivity",
      ui.created_at,
      ui.updated_at
    FROM
      users u
    JOIN
      user_info ui
    ON
      ui.user_id=u.id
    WHERE
      u.id=$1
  `, [id]);

  return rows[0];
};

export const Login = async (email: string, password: string): Promise<BaseUser> => {
  const { rows } = await pool.query(
    `
    SELECT id, email FROM users WHERE email = $1 AND password = crypt($2, password) AND active = true`,
    [email, password],
  );

  return rows[0];
};

export const SaveRefresh = async (id: number, token: string): Promise<void> => {
  const { rows } = await pool.query('SELECT token FROM refresh_tokens WHERE user_id=$1', [id]);

  if (rows.length > 0) {
    await pool.query('UPDATE refresh_tokens SET token=$1 WHERE user_id=$2', [token, id]);
  } else {
    await pool.query('INSERT INTO refresh_tokens(token, user_id) VALUES($1, $2)', [token, id]);
  }
};

export const GetRefresh = async (token: string): Promise<boolean> => {
  const { rowCount } = await pool.query('SELECT token FROM refresh_tokens WHERE token=$1', [token]);

  return rowCount > 0;
};

export const DeleteRefresh = async (token: string): Promise<number> => {
  const { rowCount } = await pool.query('DELETE FROM refresh_tokens WHERE token=$1', [token]);

  return rowCount;
};
