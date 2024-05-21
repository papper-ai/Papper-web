import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../types/User"

const initialState: User = {
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth (state, action : PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export const { reducer: userReducer, actions: userActions } = userSlice
