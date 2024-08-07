import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { tokenActions, TokenSchema } from "entities/Token"
import { userActions } from "entities/User"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
interface LoginByUsernameProps {
    login: string;
    password: string;
}

export const authByLogin = createAsyncThunk<TokenSchema, LoginByUsernameProps, ThunkConfig<string>>(
    "login",
    async ({ login, password }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<TokenSchema>("auth/login", { login, password }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })

            if (!response.data) {
                throw new Error()
            }

            const { access_token: accessToken, refresh_token: refreshToken } = response.data

            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.token)
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken.token)
            dispatch(tokenActions.setToken(accessToken.token))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
