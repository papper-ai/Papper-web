export type VaultType = "graph" | "vector"

export interface IDocument{
    content: string
    id: string
    name: string
    text: string
    vault_id: string
}
export interface VaultSchema{
    id: string
    name: string
    type: VaultType
    created_at?: string
    user_id?: string
    documents?: IDocument[]
}

export interface VaultsSchema{
    isLoading?: boolean
    error?: string
    vaults: VaultSchema[]
}
