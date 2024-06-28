import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getVaultsPreview } from "../services/getVaultsPreview/getVaultsPreview"
import { IDocument, VaultsSchema } from "../types/VaultSchema"

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
        addVaultDocument: (state, action: PayloadAction<{docs: IDocument[]; id: string}>) => {
            const vaultIndex = state.vaults.findIndex((vault) => vault.id === action.payload.id)
            console.log(vaultIndex)
            state.vaults[vaultIndex].documents = action.payload.docs || []
        },
        deleteVault: (state, action) => {
            const vaultIndex = state.vaults.findIndex((vault) => vault.id === action.payload)
            state.vaults.splice(vaultIndex, 1)
        },
        renameVault: (state, action) => {
            const vaultIndex = state.vaults.findIndex((vault) => vault.id === action.payload.id)
            state.vaults[vaultIndex].name = action.payload.name
        },
        deleteDocument: (state, action: { payload: { vaultId: string | undefined; id: string } }) => {
            const vaultIndex = state.vaults.findIndex((vault) => vault.id === action.payload.vaultId)
            const documentIndex = state.vaults[vaultIndex]?.documents?.findIndex(
                (document) => document.id === action.payload.id
            )
            console.log(documentIndex)
            state.vaults[vaultIndex]?.documents?.splice(documentIndex, 1)
        },
        addDocument: (state, action: { payload: { documents: IDocument[] | undefined; vaultId: string } }) => {
            const vaultIndex = state.vaults.findIndex((vault) => vault.id === action.payload.vaultId)
            state.vaults[vaultIndex].documents = action.payload.documents
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
