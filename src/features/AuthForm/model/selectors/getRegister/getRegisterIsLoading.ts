import type { StateSchema } from "app/providers/StoreProvider"

export const getRegisterIsLoading = (state: StateSchema) => state?.register?.isLoading
