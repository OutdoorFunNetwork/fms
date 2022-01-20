import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LoaderFunction, useLoaderData } from 'remix';
import { Post } from '~/utils/models/Post';
import { findAll as findAllPosts } from '~/utils/services/posts.service';

type PostList = {
  count: number;
  posts: Post[];
}

export const loader: LoaderFunction = async () => {
  const data = await findAllPosts();

  return data;
};

const Index: FC = () => {
  const data: PostList = useLoaderData();
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {
          data.posts.map((p: Post) => (
            <li key={p.id}>
              <Link to={p.slug}>{p.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Index;
