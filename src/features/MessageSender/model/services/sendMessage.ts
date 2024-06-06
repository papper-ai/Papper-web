import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider"
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AnswerSchema, chatsActions } from "entities/Chat"
import { messageActions } from "../slice/messageSlice"
import { IMessage } from "../types/MessageSchema"

interface SendMessageProps {
    vaultId: string
    chatId: string
    query: string
}

export const sendMessage = createAsyncThunk<IMessage, SendMessageProps, ThunkConfig<string>>(
    "sendMessage",
    async ({ vaultId, chatId, query }, { extra, dispatch, rejectWithValue }) => {
        try {
            dispatch(chatsActions.addMessage({ id: chatId, message: { content: query, role: "user" } }))
            const response = await extra.api.post<IMessage>("qa/generate_answer", { vault_id: vaultId, chat_id: chatId, query })
            if (!response.data) {
                throw new Error()
            }
            dispatch(chatsActions.addMessage({ id: chatId, message: response.data.ai_message }))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
