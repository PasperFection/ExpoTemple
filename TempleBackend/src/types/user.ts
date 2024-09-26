export interface User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
}