import { createSlice } from "@reduxjs/toolkit"
import { getVaultsPreview } from "../services/getVaultsPreview/getVaultsPreview"
import { IDocument, VaultSchema, VaultsSchema } from "../types/VaultSchema"

const initialState: VaultsSchema = {
    isLoading: false,
    error: undefined,
    vaults: []
}

const vaultsSlice = createSlice({
    name: "vaults",
    initialState,
    reducers: {
        setVaults: (state, action) => {
            state.vaults = action.payload
        },
        pushVaults: (state, action) => {
            state.vaults.push(action.payload)
        },
        addVaultDocument: (state, action) => {
            for (let i = 0; i < state.vaults.length; i++) {
                if (state.vaults[i].id === action.payload[0].vault_id) {
                    state.vaults[i].documents = action.payload
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVaultsPreview.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getVaultsPreview.fulfilled, (state, action) => {
                state.isLoading = false
                state.vaults = action.payload
            })
            .addCase(getVaultsPreview.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { reducer: vaultsReducer, actions: vaultsActions } = vaultsSlice
