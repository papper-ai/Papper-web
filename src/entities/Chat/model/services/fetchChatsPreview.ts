import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { ChatSchema } from "../types/ChatSchema"

export const fetchChatsPreview = createAsyncThunk<ChatSchema[], void, ThunkConfig<string>>(
    "getChatsPreview",
    async (_, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<ChatSchema[]>("messaging/get_user_chats_preview")

            if (!response.data) {
                throw new Error()
            }
            const chats = response.data
            return chats
        } catch (e) {
            return rejectWithValue("error")
        }
    }
)
