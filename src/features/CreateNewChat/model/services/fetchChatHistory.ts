import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider"
import { ChatSchema } from "entities/Chat"
import { currentChatActions } from "../slice/currentChatSlice"
interface ChatHistoryProps {
    chatId: string
}

export const fetchChatHistory = createAsyncThunk<ChatSchema, ChatHistoryProps, ThunkConfig<string>>(
    "createNewChat",
    async ({ chatId }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.get<ChatSchema>("messaging/get_chat/" + chatId)
            if (!response.data) {
                throw new Error()
            }
            dispatch(currentChatActions.addChatHistory(response.data.chat_history))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
