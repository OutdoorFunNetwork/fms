import { QueryResult } from "pg";
import pool from "../db";
import { Post } from "./post.model";

export const findAll = async (): Promise<QueryResult<Post[]>> => {
    const posts = await pool.query('SELECT * FROM posts');

    return posts;
};
export const findById = async (id: number): Promise<Post> => Promise.resolve({} as Post);