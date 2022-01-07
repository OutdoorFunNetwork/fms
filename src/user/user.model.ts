export interface BaseUser {
    email: string;
    displayName?: string;
    location?: string;
    avatar?: string;
    bio?: string;
    primaryActivity?: string;
}

export interface User extends BaseUser {
    id: number;
}