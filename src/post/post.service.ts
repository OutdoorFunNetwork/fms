import { QueryResult } from "pg";
import pool from "../db";
import { Post } from "./post.model";

export const findAll = async (): Promise<QueryResult<Post[]>> => {
    const posts = await pool.query(`
        SELECT * FROM posts p NATURAL JOIN users, LATERAL (
            SELECT ARRAY (
                select c.name from posts_categories pc 
                JOIN categories c on c.uid = pc.category_id
                where pc.post_id = p.uid
            ) as categories
        ) t
    `);

    return posts;
};
export const findById = async (id: number): Promise<Post> => {
    const { rows } = await pool.query(`
        SELECT * FROM posts p NATURAL JOIN users, LATERAL (
            SELECT ARRAY (
                select c.name from posts_categories pc 
                JOIN categories c on c.uid = pc.category_id
                where pc.post_id = p.uid
            ) as categories
        ) t  WHERE p.uid = $1
    `, [id]);
    
    return rows[0];
}