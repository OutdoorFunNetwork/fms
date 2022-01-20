import { findAll as allPosts } from '~/utils/services/posts.service';
/* eslint-disable import/prefer-default-export */
import { json, LoaderFunction } from 'remix';

export const loader: LoaderFunction = async () => {
  const data = await allPosts();

  return json(data, 200);
};
