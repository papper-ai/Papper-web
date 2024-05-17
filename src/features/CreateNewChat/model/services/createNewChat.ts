import { createAsyncThunk } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router-dom"
import type { ThunkConfig } from "app/providers/StoreProvider"
import { chatsActions, ChatSchema } from "entities/Chat"
import { currentChatActions } from "../slice/currentChatSlice"

interface CreateNewChatProps {
    name: string
    vaultId: string
    navigate?: NavigateFunction
}

export const createNewChat = createAsyncThunk<ChatSchema, CreateNewChatProps, ThunkConfig<string>>(
    "createNewChat",
    async ({ name, vaultId, navigate }, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<ChatSchema>("messaging/create_chat", { name, vault_id: vaultId })
            if (!response.data) {
                throw new Error()
            }
            dispatch(chatsActions.pushChat(response.data))
            dispatch(currentChatActions.setNewChat(response.data))
            navigate("/main" + "/" + response.data.id)
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
