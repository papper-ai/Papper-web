export type IRole = "user" | "ai"

export interface ITraceback{
    document_id: string
    information: string
    document_name: string
}

export interface AnswerSchema {
    role: IRole
    content: string
    traceback?: ITraceback[]
}

export interface IChatHistory {
    chat_id: string
    history: AnswerSchema[]
}

export interface ChatSchema{
    id: string
    name: string
    vault_id: string
    is_archived?: boolean
    created_at?: string
    chat_history?: IChatHistory
}

export interface ChatsSchema{
    isLoading?: boolean
    error?: string
    isLoadingHistory?: boolean
    errorHistory?: string
    chats?: ChatSchema[]
}

export interface SendMessageProps {
    vault_id: string
    chat_id: string
    query: string
}
export interface NewChatProps {
    vault_id: string;
    name: string;
}
