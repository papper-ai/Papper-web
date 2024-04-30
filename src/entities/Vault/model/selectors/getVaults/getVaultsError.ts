import type { StateSchema } from "app/providers/StoreProvider"

export const getVaultsError = (state: StateSchema) => state.vaults.error
