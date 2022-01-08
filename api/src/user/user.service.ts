import pool from '../db'
import ValidationError from '../_core/errors/ValidationError';
import { CreatedUser, User } from './user.model';

import * as crypto from 'crypto';
/*
 email: string;
    displayName?: string;
    location?: string;
    avatar?: string;
    bio?: string;
    primaryActivity?: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
*/

const USER_QUERY = `
  SELECT 
    uid, email, display_name, location, avatar, bio, primary_activity, active
  FROM 
    users
`;
export const getUserById = async (id: number, verifyExisting = false): Promise<User> => {
  const user = await pool.query(`${ USER_QUERY } WHERE uid=$1 LIMIT 1`, [id]);

  if (user.rowCount < 1 && verifyExisting) {
    throw new Error(`We're having trouble.`);
  }

  return user.rows[0];
}

export const getUserByEmail = async (email: string, verifyExisting = false): Promise<User> => {
  const user = await pool.query(`${ USER_QUERY } WHERE email=$1 LIMIT 1`, [email]);
  
  if (user.rowCount < 1 && verifyExisting) {
    throw new Error(`We're having trouble.`);
  }

  return user.rows[0];
}

export const StartCreateUser = async (email: string): Promise<CreatedUser> => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ValidationError('Email already exists!');
  }

  const randoToken = crypto.randomBytes(48).toString('hex').slice(0, 48);

  const { rows } = await pool.query(`INSERT INTO users(email) VALUES ($1) RETURNING email, uid`, [email]);
  const token = await pool.query(`
    INSERT INTO user_tokens(token, user_id, expires_at) VALUES($1, $2, NOW() + interval '1 hour') RETURNING token`
    , [randoToken, rows[0].uid]
  );

  return { ...token.rows[0], ...rows[0] };
}

export const VerifyToken = async (uid: number, token: string): Promise<boolean> => {
  const tokenQ = await pool.query(`SELECT token FROM user_tokens WHERE user_id=$1 AND token=$2 AND expires_at > NOW()`, [uid, token]);

  if (tokenQ.rowCount < 1) {
    throw new ValidationError('Having trouble with this request.');
  }

  return tokenQ.rowCount > 0;
}