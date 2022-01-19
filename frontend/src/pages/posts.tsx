import { FC } from 'react';
import useTitle from '../hooks/useTitle';

const Posts: FC = () => {
  useTitle('Posts');

  return <h1>Posts</h1>;
};

export default Posts;
