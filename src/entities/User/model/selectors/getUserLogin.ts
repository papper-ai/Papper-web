import type { StateSchema } from "app/providers/StoreProvider"

export const getUserAuth = (state: StateSchema) => state.user.isAuth
