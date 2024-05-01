import type { StateSchema } from "app/providers/StoreProvider"

export const getChats = (state: StateSchema) => state?.chats.chats
