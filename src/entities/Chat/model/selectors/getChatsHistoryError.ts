import { StateSchema } from "app/providers/StoreProvider"

export const getChatsHistoryError = (state: StateSchema) => state.chats?.errorHistory
