import { StateSchema } from "app/providers/StoreProvider"

export const getRegisterSecret = (state: StateSchema) => state?.register?.secret
