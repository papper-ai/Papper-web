export interface LoginSchema {
    login: string;
    password: string;
    isLoading?: boolean;
    error?: string;
}

export interface RegisterSchema {
    secret: string;
    name: string;
    surname: string;
    login: string;
    password: string;
    isLoading?: boolean;
    error?: string;
    success?: boolean;
}
