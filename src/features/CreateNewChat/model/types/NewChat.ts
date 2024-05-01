import { ChatSchema } from "entities/Chat"

export interface CurrentChatSchema{
    isLoading?: boolean
    error?: string
    chat: ChatSchema
}
