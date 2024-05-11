import type { StateSchema } from "app/providers/StoreProvider"

export const getChatsPreview = (state: StateSchema) => state?.chats?.chats
