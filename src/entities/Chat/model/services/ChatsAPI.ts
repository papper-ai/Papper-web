import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "shared/api/api"
import { ACCESS_TOKEN_KEY } from "shared/const/localStorage"
import { ChatSchema, AnswerSchema, SendMessageProps } from "../types/ChatSchema"


export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
        }
    }),
    endpoints: (build) => ({
        getChatsPreview: build.query<ChatSchema[], void>({
            query: () => ({
                url: "messaging/get_user_chats_preview"
            })
        }),
        getChatHistory: build.query<ChatSchema, string>({
            query: (chatId) => ({
                url: `messaging/get_chat/${chatId}`
            })
        }),
        sendMessage: build.mutation<AnswerSchema, SendMessageProps>({
            query: (props) => ({
                url: "/qa/generate_answer",
                method: "POST",
                body: props
            }),
            async onQueryStarted (message, { dispatch, queryFulfilled }) {
                console.log(message)
                dispatch(chatsApi.util.updateQueryData("getChatHistory", message.chat_id, (draft) => {
                    draft.chat_history.history.push({ content: message.query, role: "user" })
                }))
            }

        })
    })
})
