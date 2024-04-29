import { StateSchema } from "app/providers/StoreProvider"

export const getRegisterName = (state: StateSchema) => state?.register?.name
