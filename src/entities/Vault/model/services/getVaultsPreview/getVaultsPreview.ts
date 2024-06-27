import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { vaultsActions } from "../../slice/vaultsSlice"
import { VaultSchema } from "../../types/VaultSchema"
interface GetVaultPreviewProps {}

export const getVaultsPreview = createAsyncThunk<VaultSchema[], GetVaultPreviewProps, ThunkConfig<string>>(
    "getVaultPreview",
    async ({}, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.get<VaultSchema[]>("/vault/vaults/preview")

            if (!response.data) {
                throw new Error()
            }

            const vaults = response.data
            dispatch(vaultsActions.setVaults(vaults))
            return response.data
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
