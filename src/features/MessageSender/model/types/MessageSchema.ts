import { AnswerSchema } from "entities/Chat"

export interface IMessage {
    ai_message: AnswerSchema
    history_exception?: string
    vault_exception?: string
    add_user_message_exception?: string
    add_ai_message_exception?: string
}

export interface MessageSchema {
    isLoading?: boolean
    error?: string
    message?: IMessage
}
