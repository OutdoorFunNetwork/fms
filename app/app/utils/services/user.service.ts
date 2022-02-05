import { pg, pool } from '../db.server';
import ValidationError from '../errors/ValidationError';
import { Pagination } from '../models/Pagination';
import { User } from '../models/User';
import * as crypto from 'crypto';
// attachPaginate();

class UserService {
  async list(): Promise<any> {
    return await pg<{ data: User[], pagination: Pagination }>('users')
      .join('user_info', 'users.id', '=', 'user_info.id')
      .columns(
        'users.id',
        'users.email',
        { displayName: 'user_info.display_name' },
        'user_info.location',
        'user_info.avatar',
        'user_info.bio',
        { primaryActivity: 'user_info.primary_activity' },
    ).paginate({
      perPage: 10,
      currentPage: 1
    });
  }

  get baseQuery(): string {
    return `SELECT
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
      ui.user_id=u.id`;
  }
  
  USER_QUERY = `
    SELECT
      id, email
    FROM
      users
  `;
  async getUserById (id: number, verifyExisting = false): Promise<User> {
    const user = await pool.query(`${this.USER_QUERY} WHERE id=$1 LIMIT 1`, [id]);
  
    if (user.rowCount < 1 && verifyExisting) {
      throw new Error('We\'re having trouble.');
    }
  
    return user.rows[0];
  };
  
  async getUserByEmail (email: string, verifyExisting = false): Promise<User> {
    const user = await pool.query(`${this.USER_QUERY} WHERE email=$1 LIMIT 1`, [email]);
  
    if (user.rowCount < 1 && verifyExisting) {
      throw new Error('We\'re having trouble.');
    }
  
    return user.rows[0];
  };
  
  async StartCreateUser (email: string): Promise<User> {
    const existingUser = await this.getUserByEmail(email);
  
    if (existingUser) {
      throw new ValidationError('Email already exists!');
    }
  
    const randoToken = crypto.randomBytes(48).toString('hex').slice(0, 48);
  
    const { rows } = await pool.query('INSERT INTO users(email) VALUES ($1) RETURNING email, id', [email]);
    // eslint-disable-next-line quotes
    const token = await pool.query(`INSERT INTO user_tokens(token, user_id, expires_at) VALUES($1, $2, NOW() + interval '1 hour') RETURNING token`, [randoToken, rows[0].id]);
  
    return { ...token.rows[0], ...rows[0] };
  };
  
  async VerifyToken (id: number, token: string): Promise<boolean> {
    const tokenQ = await pool.query('SELECT token FROM user_tokens WHERE user_id=$1 AND token=$2 AND expires_at > NOW()', [id, token]);
  
    if (tokenQ.rowCount < 1) {
      throw new ValidationError('The token used is expired or invalid.');
    }
  
    return tokenQ.rowCount > 0;
  };
  
  async FinishUser (id: number, user: User): Promise<User> {
    let newUser;
    try {
      newUser = await pool.query(`
        INSERT INTO
          user_info(user_id, display_name, location, avatar, bio, primary_activity)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *
      `, [id, user.displayName, user.location, user.avatar, user.bio, user.primaryActivity]);
      await pool.query('UPDATE users SET active=$1, password=crypt($2, gen_salt(\'bf\')) WHERE id=$3', [true, user.password, newUser.rows[0].id]);
      await pool.query('DELETE FROM user_tokens WHERE user_id=$1', [newUser.rows[0].id]);
    } catch (e) {
      throw new Error('Something went wrong.');
    }
  
    return newUser.rows[0];
  };
  
  async UpdateUserInfo (userId: number, user: User): Promise<void> {
    const { rows } = await pool.query(`
      UPDATE user_info
      SET
        display_name=COALESCE($1, display_name),
        bio=COALESCE($2, bio),
        location=COALESCE($3, location),
        primary_activity=COALESCE($4, primary_activity)
      WHERE
        user_id=$5
      RETURNING *
    `, [user.displayName, user.bio, user.location, user.primaryActivity, userId]);
  
    return rows[0];
  };
  
}

export default new UserService();