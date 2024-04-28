export interface IToken{
    token: string
    token_type: string
}

export interface TokenSchema {
    access_token: IToken;
    refresh_token: IToken;
}
