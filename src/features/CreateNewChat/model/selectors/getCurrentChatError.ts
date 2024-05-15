import { StateSchema } from "app/providers/StoreProvider"

export const getCurrentChatError = (state: StateSchema) => state.currentChat.error
