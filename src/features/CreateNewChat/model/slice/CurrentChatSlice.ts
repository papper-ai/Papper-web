import { createSlice, current } from "@reduxjs/toolkit"
import { createNewChat } from "../services/createNewChat"
import { fetchChatHistory } from "../services/fetchChatHistory"
import { CurrentChatSchema } from "../types/NewChat"

const initialState: CurrentChatSchema = {
    isLoading: false,
    error: undefined,
    chat: undefined
}

const currentChatSlice = createSlice({
    name: "newChat",
    initialState,
    reducers: {
        setNewChat: (state, action) => {
            state.chat = action.payload
        },
        addMessage: (state, action) => {
            state.chat.chat_history.history.push(action.payload)
        },
        addChatHistory: (state, action) => {
            state.chat.chat_history = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewChat.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(createNewChat.fulfilled, (state, action) => {
                state.isLoading = false
                state.chat = action.payload
            })
            .addCase(createNewChat.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            // .addCase(fetchChatHistory.pending, (state) => {
            //     state.error = undefined
            //     state.isLoading = true
            // })
            // .addCase(fetchChatHistory.fulfilled, (state, action) => {
            //     state.isLoading = false
            // })
            // .addCase(fetchChatHistory.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.error = action.error.message
            // })
    }
})

export const { actions: currentChatActions, reducer: currentChatReducer } = currentChatSlice
