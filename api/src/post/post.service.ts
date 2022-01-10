import pool from '../db';
import { Post } from './post.model';

const POST_BASE_QUERY = `
SELECT
    p.*,
    json_build_object(
        'id', user_info.id,
        'display_name', user_info.display_name,
        'avatar', user_info.avatar,
        'bio', user_info.bio
    ) as author,
    ARRAY (
        SELECT
            json_build_object('id', c.id, 'name', c.name)
        FROM
            posts_categories pc
        JOIN
            categories c on c.id = pc.category_id
        WHERE
            pc.post_id = p.id
    ) as categories
FROM posts p
    INNER JOIN user_info ON (user_info.id = p.author_id)
`;

export const findAll = async (): Promise<Post[]> => {
  const { rows } = await pool.query(POST_BASE_QUERY);

  return rows;
};
export const findById = async (id: number): Promise<Post> => {
  const { rows } = await pool.query(`${POST_BASE_QUERY}  WHERE p.id = $1`, [id]);

  return rows[0];
};
