import { StateSchema } from "app/providers/StoreProvider"

export const getRegisterPassword = (state: StateSchema) => state?.register?.password
