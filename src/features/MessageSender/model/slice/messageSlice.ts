import { createSlice } from "@reduxjs/toolkit"
import { sendMessage } from "../services/sendMessage"
import { MessageSchema } from "../types/MessageSchema"

const initialState: MessageSchema = {
    error: undefined,
    isLoading: false
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { reducer: messageReducer, actions: messageActions } = messageSlice
