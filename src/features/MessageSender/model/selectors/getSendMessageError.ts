import type { StateSchema } from "app/providers/StoreProvider"

export const getSendMessageError = (state: StateSchema) => state.message.error
