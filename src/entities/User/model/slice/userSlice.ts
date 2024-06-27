import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchUserData } from "../services/fetchUserData"
import { User, UserSchema } from "../types/User"

const initialState: UserSchema = {
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsername (state, action : PayloadAction<string>) {
            state.data!.login = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const { reducer: userReducer, actions: userActions } = userSlice
