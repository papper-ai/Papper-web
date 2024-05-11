import type { StateSchema } from "app/providers/StoreProvider"

export const getRegisterSuccess = (state: StateSchema) => state?.register?.success
