import { createSlice } from "@reduxjs/toolkit"
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
    }
})

export const { reducer: messageReducer, actions: messageActions } = messageSlice
