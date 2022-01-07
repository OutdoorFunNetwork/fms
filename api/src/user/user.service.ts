import pool from '../db'
import ValidationError from '../_core/errors/ValidationError';
import { User } from './user.model';

export const StartCreateUser = async (email: string): Promise<User> => {
  const existingUser = await pool.query(`SELECT uid FROM users WHERE email=$1`, [email]);

  if (existingUser.rowCount > 0) {
    throw new ValidationError('Email already exists!');
  }

  const { rows } = await pool.query(`INSERT INTO users(email) VALUES ($1) RETURNING email`, [email]);

  return rows[0];
}