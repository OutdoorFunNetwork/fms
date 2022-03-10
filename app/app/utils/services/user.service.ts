import { getSession, hasSession } from '~/utils/session.server';
import { pg } from '../db.server';
import ValidationError from '../errors/ValidationError';
import { Pagination } from '../models/Pagination';
import { User } from '../models/User';
// attachPaginate();

class UserService {
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

  async list(request: any): Promise<any> {
    const session = await getSession(request.headers.get('Cookie'));
    const { id } = session.get('user');

    return await pg<{ data: User[], pagination: Pagination }>('users')
      .join('user_info', 'users.id', '=', 'user_info.user_id')
      .columns(
        'users.id',
        'users.email',
        { displayName: 'user_info.display_name' },
        'user_info.location',
        'user_info.avatar',
        'user_info.bio',
        { primaryActivity: 'user_info.primary_activity' },
    ).whereNot('users.id', id).orderBy('users.created_at', 'desc').paginate({
      perPage: 10,
      currentPage: 1
    });
  }

  async getUserByEmail (email: string, verifyExisting = false): Promise<User> {
    const user = await pg<User | undefined>('users').select('*').where('email', email).first();

    if (user != null && verifyExisting) {
      throw new Error('We\'re having trouble.');
    }

    return user;
  };

  async StartCreateUser (email: string): Promise<Partial<User>> {
    const existingUser = await this.getUserByEmail(email);

    if (existingUser) {
      throw new ValidationError('Email already exists!');
    }

    const randoToken = this.randomToken;

    const user: Partial<User[]> = await pg('users').insert({
      email,
    }, ['id', 'email']);
    await pg('user_info').insert({
      user_id: user[0]?.id
    });

    // eslint-disable-next-line quotes
    // const token = await pool.query(`INSERT INTO user_tokens(token, user_id, expires_at) VALUES($1, $2, NOW() + interval '1 hour') RETURNING token`, [randoToken, rows[0].id]);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const token: any[] = await pg('user_tokens').insert({
      token: randoToken,
      user_id: user[0]?.id,
      expires_at: expiration
    }, ['token']);

    return { token: token[0].token, ...user[0] };
  };

  async VerifyToken (id: number, token: string): Promise<boolean> {
    // const tokenQ = await pool.query('SELECT token FROM user_tokens WHERE user_id=$1 AND token=$2 AND expires_at > NOW()', [id, token]);
    const t = await pg<{ token: string }>('user_tokens')
      .select('token')
      .where('user_id', id)
      .andWhere('token', token)
      .andWhere('expires_at', '>', new Date())
      .first();

    if (t == null) {
      throw new Response('The token used is expired or invalid.', { status: 404 });
    }

    return true;
  };

  async FinishUser (id: number, user: User): Promise<User> {
    let newUser;
    try {
      newUser = await pg('user_info')
        .where('user_id', id)
        .update({
          display_name: user.displayName,
          location: user.location,
          bio: user.bio,
          primary_activity: user.primaryActivity,
        }).returning<User>('*');
      // newUser = await pool.query(`
      //   INSERT INTO
      //     user_info(user_id, display_name, location, avatar, bio, primary_activity)
      //   VALUES($1, $2, $3, $4, $5, $6) RETURNING *
      // `, [id, user.displayName, user.location, user.avatar, user.bio, user.primaryActivity]);
      // await pool.query('UPDATE users SET active=$1, password=crypt($2, gen_salt(\'bf\')) WHERE id=$3', [true, user.password, newUser.rows[0].id]);
      // await pool.query('DELETE FROM user_tokens WHERE user_id=$1', [newUser.rows[0].id]);
      await pg('users')
        .where('id', id)
        .update({
          active: true,
          password: pg.raw('crypt(?, gen_salt(\'bf\'))', [user.password])
        });
      await pg('user_tokens')
        .where('user_id', id)
        .delete();
    } catch (e) {
      throw new Error('Something went wrong.');
    }

    return newUser;
  };

  // async UpdateUserInfo (userId: number, user: User): Promise<void> {
  //   const { rows } = await pool.query(`
  //     UPDATE user_info
  //     SET
  //       display_name=COALESCE($1, display_name),
  //       bio=COALESCE($2, bio),
  //       location=COALESCE($3, location),
  //       primary_activity=COALESCE($4, primary_activity)
  //     WHERE
  //       user_id=$5
  //     RETURNING *
  //   `, [user.displayName, user.bio, user.location, user.primaryActivity, userId]);

  //   return rows[0];
  // };

  get randomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

}

export default new UserService();