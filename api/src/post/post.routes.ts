import express, { Request, Response } from 'express';
import { jwtMiddleware } from '../_core';
// import { jwtMiddleware } from '../_core';
import { Post } from './post.model';
import * as PostService from './post.service';
import { VerifySlug, VerifyTitle } from './post.verify';

const PostsRouter = express.Router();

PostsRouter.get('/', async (req: Request, res: Response) => {
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

    res.status(404).send({ message: 'Post not found.' });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

PostsRouter.post('/', jwtMiddleware, VerifySlug, VerifyTitle, async (req: Request, res: Response) => {
  let post: Post;
  try {
    post = await PostService.createPost(req.body, res.locals.user.id);
  } catch (e: any) {
    return res.status(e.status || 500).send({
      message: e.message,
    });
  }

  return res.status(201).send(post);
});

PostsRouter.patch('/:id/publish', jwtMiddleware, async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id, 10);
  let post;

  try {
    post = await PostService.publishPost(postId);
  } catch (e: any) {
    return res.status(e.status || 500).send({
      message: e.message,
    });
  }

  return res.status(200).send(post);
});

export default PostsRouter;
