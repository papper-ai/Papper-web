import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { registerBySecret } from "../services/register/registerBySecret"
import { RegisterSchema } from "../types/AuthSchema"

const initialState: RegisterSchema = {
    secret: "",
    name: "",
    surname: "",
    login: "",
    password: ""
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setSecret (state, action: PayloadAction<string>) {
            state.secret = action.payload
        },
        setLogin (state, action: PayloadAction<string>) {
            state.login = action.payload
        },
        setPassword (state, action: PayloadAction<string>) {
            state.password = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerBySecret.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(registerBySecret.fulfilled, (state) => {
                state.isLoading = false
                state.success = true
                state.error = undefined
            })
            .addCase(registerBySecret.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
})

export const { reducer: registerReducer, actions: registerActions } = registerSlice
