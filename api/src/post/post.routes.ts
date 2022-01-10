import express, { Request, Response } from 'express';
import { jwtMiddleware } from '../_core';
import { Post } from './post.model';
import * as PostService from './post.service';

const PostsRouter = express.Router();

PostsRouter.get('/', jwtMiddleware, async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostService.findAll();

    res.status(200).send(posts);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

PostsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const post: Post = await PostService.findById(id);

    if (post) {
      return res.status(200).send(post);
    }

    res.status(404).send('Not found.');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// Any route past this point will need to be authenticated to access.
// PostsRouter.use(checkJwt);

// Place protected routes here!

export default PostsRouter;
