import type { StateSchema } from "app/providers/StoreProvider"

export const getRegisterError = (state: StateSchema) => state?.register?.error
