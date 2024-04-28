import { createSlice } from "@reduxjs/toolkit"
import { User } from "../types/User"

const initialState: User = {
    login: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser (state, action) {
            state.login = action.payload
        }
    }
})

export const { reducer: userReducer, actions: userActions } = userSlice
