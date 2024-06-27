export type IRole = "user" | "ai"

export interface ITraceback{
    document_id: string
    information: string
    document_name: string
}
export interface AiMessage{
    content: string
    traceback?: ITraceback[]
    role: IRole
}
export interface AIAnswer{
    ai_message: AiMessage
}
export interface AnswerSchema {
    role: IRole
    content: string
    traceback?: ITraceback[]
}

export interface IChatHistory {
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
