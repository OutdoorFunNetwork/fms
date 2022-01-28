import { FC } from 'react';
import { LoaderFunction, useLoaderData, Link, MetaFunction } from 'remix';
import { Pagination } from '~/utils/models/Pagination';
import { Post } from '~/utils/models/Post';
import { findAll as findAllPosts } from '~/utils/services/posts.service';

type PostList = {
  pagination: Pagination;
  data: Post[];
}

export const loader: LoaderFunction = async () => {
  const data = await findAllPosts();

  return data;
};

export const meta: MetaFunction = ({ parentsData }) => {
  return { title: `Our Posts | ${ parentsData.root.baseTitle }` };
};

const Index: FC = () => {
  const row: PostList = useLoaderData();
  console.log(row);
  return (
    <>
      <h1>Our Posts</h1>
      <ul>
        {
          row.data.map((p: Post) => (
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
