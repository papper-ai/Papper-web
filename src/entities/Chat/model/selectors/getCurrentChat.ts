import type { StateSchema } from "app/providers/StoreProvider"

export const getCurrentChat = (id: string, state: StateSchema) => state?.chats?.chats?.find((chat) => chat.id === id)
