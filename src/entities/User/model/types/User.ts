export interface User {
    login?: string
}
export interface UserSchema {
    data?: User;
    error?: string
    isLoading?: boolean
}
