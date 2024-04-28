import { StateSchema } from "app/providers/StoreProvider"

export const getToken = (state: StateSchema) => state?.token.token
