import express, { Request, Response } from 'express';
import { jwtMiddleware } from '../_core';
// import { jwtMiddleware } from '../_core';
import { Post } from './post.model';
import * as PostService from './post.service';
import { FullValidate } from './post.verify';

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

PostsRouter.patch('/:id', jwtMiddleware, async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const post: Post = await PostService.updatePost(req.body, id);

    res.status(200).send(post);
  } catch (e: any) {
    res.status(400).send({ errors: [e.message] });
  }
});

PostsRouter.delete('/:id', jwtMiddleware, async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  try {
    await PostService.deletePost(postId);
  } catch (e: any) {
    return res.status(e.status || 500).send({
      errors: [
        e.message,
      ],
    });
  }

  return res.sendStatus(200);
});

PostsRouter.post('/', jwtMiddleware, FullValidate, async (req: Request, res: Response) => {
  let post: Post;
  try {
    post = await PostService.createPost(req.body, res.locals.user.id);
  } catch (e: any) {
    return res.status(e.status || 500).send({
      errors: [
        e.message,
      ],
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
      errors: [
        e.message,
      ],
    });
  }

  return res.status(200).send(post);
});

PostsRouter.patch('/:id/unpublish', jwtMiddleware, async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id, 10);
  let post;

  try {
    post = await PostService.unPublishPost(postId);
  } catch (e: any) {
    return res.status(e.status || 500).send({
      errors: [
        e.message,
      ],
    });
  }

  return res.status(200).send(post);
});

export default PostsRouter;
