import { createSlice } from "@reduxjs/toolkit"
import { fetchChatsPreview } from "../services/fetchChatsPreview"
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
            return { ...state, chats: action.payload }
        },
        pushChat: (state, action) => {
            state.chats?.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatsPreview.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchChatsPreview.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload)
                state.chats = action.payload
            })
            .addCase(fetchChatsPreview.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export const { reducer: chatsReducer, actions: chatsActions } = chatsSlice
