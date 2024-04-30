import type { StateSchema } from "app/providers/StoreProvider"

export const getVaultsIsLoading = (state: StateSchema) => state.vaults.isLoading
