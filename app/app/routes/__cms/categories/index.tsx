import { FC } from 'react';
import { MetaFunction } from 'remix';

export const meta: MetaFunction = ({ parentsData }) => ({ title: `Our Categories | ${parentsData.root.baseTitle}` });

const Categories: FC = () => {
  return (
    <h1>Categories</h1>
  )
};

export default Categories;