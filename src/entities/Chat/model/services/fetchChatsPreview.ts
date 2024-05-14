import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { currentChatActions } from "features/CreateNewChat"
import { ChatSchema } from "../types/ChatSchema"
interface GetChatPreviewProps {

}

export const fetchChatsPreview = createAsyncThunk<ChatSchema[], GetChatPreviewProps, ThunkConfig<string>>(
    "getChatsPreview",
    async ({ }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.get<ChatSchema[]>("messaging/get_user_chats_preview")

            if (!response.data) {
                throw new Error()
            }
            const chats = response.data
            dispatch(currentChatActions.setNewChat(chats[0]))

            return chats
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
