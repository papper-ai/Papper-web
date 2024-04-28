import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
        setName (state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setSurname (state, action: PayloadAction<string>) {
            state.surname = action.payload
        },
        setLogin (state, action: PayloadAction<string>) {
            state.login = action.payload
        },
        setPassword (state, action: PayloadAction<string>) {
            state.password = action.payload
        }
    }
})

export const { reducer: registerReducer, actions: registerActions } = registerSlice
