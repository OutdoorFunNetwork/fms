import { RouteData } from '@remix-run/react/routeData';
import { FC } from 'react';
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Post } from '~/utils/models/Post';
import { findById } from '~/utils/services/posts.service';

export const meta: MetaFunction = ({ data, parentsData }: { data: Post, parentsData: RouteData }) => {\
  if (!data) {
    return {
      title: `Not Found | ${ parentsData.root.baseTitle }`,
    }
  }

  return {
    title: `${ data.title} | ${ parentsData.root.baseTitle }`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'The post slug is required.');

  const postId = parseInt(params.id, 10);
  const post = await findById(postId);

  if (post == null) {
    throw new Response('Not found', {
      status: 404,
    });
  }

  return post;
}

const EditPost: FC = () => {
  const post: Post = useLoaderData();

  return (
    <h1>{post.title}</h1>
  )
};

export default EditPost;
