import type { StateSchema } from "app/providers/StoreProvider"

export const getUserLogin = (state: StateSchema) => state.user.login
