import { pool } from '../db.server';
import { User } from '../models/User';

export const GetMe = async (id: number): Promise<User> => {
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

export const Login = async (email: string, password: string): Promise<{ user: User; rowCount: number }> => {
  const { rows, rowCount } = await pool.query(
    `
    SELECT
      u.id,
      u.email,
      ui.display_name as "displayName",
      ui.location,
      ui.avatar,
      ui.bio,
      ui.primary_activity as "primaryActivity"
    FROM
      users u
    JOIN
      user_info ui
    on
      ui.user_id=u.id
    WHERE
      u.email = $1 AND u.password = crypt($2, u.password) AND u.active = true`,
    [email, password],
  );

  return { user: rows[0], rowCount };
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
