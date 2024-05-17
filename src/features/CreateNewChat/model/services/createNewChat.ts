import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider"
import { chatsActions, ChatSchema } from "entities/Chat"
import { currentChatActions } from "../slice/currentChatSlice"

interface CreateNewChatProps {
    name: string
    vaultId: string
}

export const createNewChat = createAsyncThunk<ChatSchema, CreateNewChatProps, ThunkConfig<string>>(
    "createNewChat",
    async ({ name, vaultId }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<ChatSchema>("messaging/create_chat", { name, vault_id: vaultId })
            if (!response.data) {
                throw new Error()
            }
            dispatch(chatsActions.pushChat(response.data))
            dispatch(currentChatActions.setNewChat(response.data))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
