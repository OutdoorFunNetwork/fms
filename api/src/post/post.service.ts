import { QueryResult } from "pg";
import pool from "../db";
import { Post } from "./post.model";

const POST_BASE_QUERY = `
SELECT
    p.*,
    json_build_object(
        'uid', users.uid,
        'display_name', users.display_name,
        'avatar', users.avatar,
        'bio', users.bio
    ) as author,
    ARRAY (
        SELECT
            json_build_object('uid', c.uid, 'name', c.name)
        FROM
            posts_categories pc
        JOIN
            categories c on c.uid = pc.category_id
        WHERE
            pc.post_id = p.uid
    ) as categories
FROM posts p
    INNER JOIN users ON (users.uid = p.author_id)
`

export const findAll = async (): Promise<Post[]> => {
    const { rows } = await pool.query(POST_BASE_QUERY);

    return rows;
};
export const findById = async (id: number): Promise<Post> => {
    const { rows } = await pool.query(`${ POST_BASE_QUERY }  WHERE p.uid = $1`, [id]);

    return rows[0];
}
