import { pg } from '../db.server';
import { Pagination } from '../models/Pagination';
import { User } from '../models/User';
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
}

export default new UserService();