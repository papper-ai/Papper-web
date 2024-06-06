import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchChatHistory } from "../services/fetchChatHistory"
import { fetchChatsPreview } from "../services/fetchChatsPreview"
import { ChatsSchema, ChatSchema, AnswerSchema } from "../types/ChatSchema"

const initialState: ChatsSchema = {
    isLoading: false,
    error: undefined,
    errorHistory: undefined,
    isLoadingHistory: false,
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
        },
        deleteChat: (state, action) => {
            state.chats = state.chats?.filter((item) => item.id !== action.payload)
        },
        renameChat: (state, action: { payload: { id: string; name: string } }) => {
            const chatIndex = state.chats?.findIndex((item) => item.id === action.payload.id)
            state.chats[chatIndex].name = action.payload.name
        },
        addHistory: (state, action: PayloadAction<ChatSchema>) => {
            const chatIndex = state.chats.findIndex((chat) => chat.id === action.payload.id)
            state.chats[chatIndex] = action.payload
        },
        addMessage: (state, action: PayloadAction<{id: string; message: AnswerSchema }>) => {
            const chatIndex = state.chats.findIndex((chat) => chat.id === action.payload.id)
            state.chats[chatIndex].chat_history.history.push(action.payload.message)
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
            .addCase(fetchChatHistory.pending, (state) => {
                state.errorHistory = undefined
                state.isLoadingHistory = true
            })
            .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatSchema>) => {
                state.errorHistory = undefined
                state.isLoadingHistory = false
                const chatIndex = state.chats.findIndex((chat) => chat.id === action.payload.id)
                state.chats[chatIndex] = action.payload
            })
            .addCase(fetchChatHistory.rejected, (state, action) => {
                state.errorHistory = action.error.message
                state.isLoadingHistory = true
            })
    }
})

export const { reducer: chatsReducer, actions: chatsActions } = chatsSlice
