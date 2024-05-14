import type { StateSchema } from "app/providers/StoreProvider"

export const getSendMessageIsLoading = (state: StateSchema) => state.message?.isLoading
