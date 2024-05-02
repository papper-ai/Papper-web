import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider"
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { currentChatActions } from "features/CreateNewChat"
import { AnswerSchema } from "entities/Chat"
import { messageActions } from "../slice/messageSlice"

interface SendMessageProps {
    vaultId: string
    chatId: string
    query: string
}

export const sendMessage = createAsyncThunk<AnswerSchema, SendMessageProps, ThunkConfig<string>>(
    "sendMessage",
    async ({ vaultId, chatId, query }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<AnswerSchema>("answer/generate_answer", { vault_id: vaultId, chat_id: chatId, query })
            if (!response.data) {
                throw new Error()
            }
            dispatch(messageActions.setMessage(response.data))
            dispatch(currentChatActions.addMessage(response.data))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
