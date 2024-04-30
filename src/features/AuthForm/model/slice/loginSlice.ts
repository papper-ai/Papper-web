import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authByLogin } from "../services/login/authByLogin"
import { LoginSchema } from "../types/AuthSchema"

const initialState: LoginSchema = {
    login: "",
    password: "",
    isLoading: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin (state, action: PayloadAction<string>) {
            state.login = action.payload
        },
        setPassword (state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setIsLoading (state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authByLogin.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(authByLogin.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(authByLogin.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { reducer: loginReducer, actions: loginActions } = loginSlice
