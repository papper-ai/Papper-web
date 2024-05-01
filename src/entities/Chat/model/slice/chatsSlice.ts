import { createSlice } from "@reduxjs/toolkit"
import { getChatsPreview } from "../services/GetChatsPreview"
import { ChatsSchema } from "../types/ChatSchema"

const initialState: ChatsSchema = {
    isLoading: false,
    error: undefined,
    chats: []
}

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        pushChat: (state, action) => {
            state.chats.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatsPreview.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getChatsPreview.fulfilled, (state, action) => {
                state.isLoading = false
                state.chats = action.payload
            })
            .addCase(getChatsPreview.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export const { reducer: chatsReducer, actions: chatsActions } = chatsSlice
