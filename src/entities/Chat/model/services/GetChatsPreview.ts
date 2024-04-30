import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { chatsActions } from "../slice/chatsSlice"
import { ChatSchema } from "../types/ChatSchema"
interface GetChatPreviewProps {}

export const getChatsPreview = createAsyncThunk<ChatSchema[], GetChatPreviewProps, ThunkConfig<string>>(
    "getChatsPreview",
    async ({}, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.get<ChatSchema[]>("messaging/get_user_chats_preview")

            if (!response.data) {
                throw new Error()
            }

            const chats = response.data
            dispatch(chatsActions.setChats(chats))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
