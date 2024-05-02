import { AnswerSchema } from "entities/Chat"

export interface MessageSchema {
    isLoading?: boolean
    error?: string
    message?: AnswerSchema
}
