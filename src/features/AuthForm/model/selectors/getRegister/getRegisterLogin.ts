import type { StateSchema } from "app/providers/StoreProvider"

export const getRegisterLogin = (state: StateSchema) => state?.register?.login
