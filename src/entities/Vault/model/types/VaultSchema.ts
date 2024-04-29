export type VaultType = "graph" | "vector"

export interface IDocument{
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
