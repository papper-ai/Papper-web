import { AxiosInstance } from "axios"
import { IToken } from "entities/Token"
import { User } from "entities/User"
import { LoginSchema, RegisterSchema } from "features/AuthForm"
import { NavigateOptions, To } from "react-router-dom"

export interface StateSchema {
    counter?: number;
    token: IToken;
    login: LoginSchema;
    register: RegisterSchema;
    user: User;
}
export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
