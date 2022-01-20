/* eslint-disable import/prefer-default-export */
import { json, LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

import { findById as findPostById } from '~/utils/services/posts.service';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'Post id is required!');

  const id = parseInt(params.id, 10);
  const post = await findPostById(id);

  return json(post, 200);
};
