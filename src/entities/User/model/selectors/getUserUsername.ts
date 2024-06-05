import type { StateSchema } from "app/providers/StoreProvider"

export const getUserUsername = (state: StateSchema) => state.user.data?.login
