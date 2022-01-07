export interface BaseUser {
    email: string;
    displayName?: string;
    location?: string;
    avatar?: string;
    bio?: string;
    primaryActivity?: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface User extends BaseUser {
    id: number;
    password: string;
}