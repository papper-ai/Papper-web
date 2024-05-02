import type { StateSchema } from "app/providers/StoreProvider"

export const getCurrentChat = (state: StateSchema) => state.currentChat.chat
