import { createSlice } from "@reduxjs/toolkit"
import { IToken } from "../types/IToken"

const initialState: IToken = {
    token: "",
    token_type: "Bearer"
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        }
    }
})

export const { reducer: tokenReducer, actions: tokenActions } = tokenSlice
