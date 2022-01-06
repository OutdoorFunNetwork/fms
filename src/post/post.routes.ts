import express, { Request, Response } from 'express';
import { Post } from './post.model';
import * as PostService from './post.service';

import { QueryResult } from 'pg';


export const PostsRouter = express.Router();

PostsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const posts: QueryResult<Post[]> = await PostService.findAll();

        res.status(200).send(posts.rows);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

PostsRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const post: Post = await PostService.findById(id);

        if (post) {
            return res.send(200).send(post);
        }

        res.send(404).send("Not found.");
    } catch (e: any) {
        res.send(500).send(e.message);
    }
});