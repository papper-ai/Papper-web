import type { StateSchema } from "app/providers/StoreProvider"

export const getCurrentChat = (id: string | undefined, state: StateSchema) => state?.chats?.chats?.find((chat) => chat.id === id)
