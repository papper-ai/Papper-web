import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { ChatSchema } from "../types/ChatSchema"

interface ChatHistoryProps {
    chatId: string
}

export const fetchChatHistory = createAsyncThunk<ChatSchema, ChatHistoryProps, ThunkConfig<string>>(
    "fetchChatHistory",
    async ({ chatId }, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<ChatSchema>("messaging/get_chat/" + chatId)

            if (!response.data) {
                throw new Error()
            }
            const history = response.data
            return history
        } catch (e) {
            return rejectWithValue("error")
        }
    }
)
