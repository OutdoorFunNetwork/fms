import { pool } from '../db.server';
import { User } from '../models/User';

class UserService {
  async list(): Promise<{ users: User[], count: number }> {
    const { rows, rowCount } = await pool.query(`${this.baseQuery}`);

    return {
      users: rows,
      count: rowCount,
    };
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
}

export default new UserService();