import { StateSchema } from "app/providers/StoreProvider"

export const getRegisterSurname = (state: StateSchema) => state?.register?.surname
