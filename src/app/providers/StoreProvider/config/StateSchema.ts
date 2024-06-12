import { AxiosInstance } from "axios"
import { NavigateOptions, To } from "react-router-dom"
import { LoginSchema, RegisterSchema } from "features/AuthForm"
import { MessageSchema } from "features/MessageSender"
import { chatsApi, ChatsSchema } from "entities/Chat"
import { IToken } from "entities/Token"
import { UserSchema } from "entities/User"
import { VaultsSchema } from "entities/Vault"

export interface StateSchema {
    counter?: number;
    token: IToken;
    login: LoginSchema;
    register: RegisterSchema;
    user: UserSchema;
    vaults: VaultsSchema;
    chats: ChatsSchema;
    message: MessageSchema;
    [chatsApi.reducerPath]: ReturnType<typeof chatsApi.reducer>;
}
export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
