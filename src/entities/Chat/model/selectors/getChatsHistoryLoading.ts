import { StateSchema } from "app/providers/StoreProvider"

export const getChatsHistoryLoading = (state: StateSchema) => state.chats?.isLoadingHistory
