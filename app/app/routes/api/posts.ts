/* eslint-disable import/prefer-default-export */
import { json, LoaderFunction } from 'remix';
import { pool } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');

  return json(rows, 200);
};
