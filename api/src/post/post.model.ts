import { User } from '../user/user.model';

export interface BasePost{
    slug: string;
    title: string;
    body?: string;
    author: User
}

export interface Post extends BasePost {
    id: number;
}

export interface Posts {
    [key: number]: Post;
}
