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
    uid: number;
    password: string;
}

export interface CreatedUser {
    uid: number;
    email: string;
    token: string;
}