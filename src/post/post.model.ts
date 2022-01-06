import { User } from "../user/user.model";

export interface Post {
    id: number;
    slug: string;
    title: string;
    body?: string;
    author: User
}