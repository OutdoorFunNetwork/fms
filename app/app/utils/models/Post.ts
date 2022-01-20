import { User } from './User';

export type Post = {
  id: number;
  slug: string;
  title: string;
  body?: string;
  author: User
}