import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { AxiosRequestConfig } from "axios"
import { $api } from "shared/api/api"
import { ChatSchema, AnswerSchema, SendMessageProps, NewChatProps } from "../types/ChatSchema"
interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
}
const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>

    async ({ url, params, method, data }) => {
        try {
            const result = await $api({ url: baseUrl + url, params, method, data })
            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message
                }
            }
        }
    }

export const chatsApi = createApi({
    reducerPath: "chatsApi",
    baseQuery: axiosBaseQuery({ baseUrl: "" }),
    tagTypes: ["Chats"],
    endpoints: (build) => ({
        getChatsPreview: build.query<ChatSchema[], void>({
            query: () => ({
                url: "messaging/get_user_chats_preview",
                method: "GET"
            }),
            providesTags: result => ["Chats"]
        }),
        getChatHistory: build.query<ChatSchema, string>({
            query: (chatId) => ({
                url: `messaging/get_chat/${chatId}`,
                method: "GET"
            })
        }),
        sendMessage: build.mutation<AnswerSchema, SendMessageProps>({
            query: (props) => ({
                url: "/qa/generate_answer",
                method: "POST",
                data: props
            }),
            async onQueryStarted (message, { dispatch }) {
                console.log(message)
                dispatch(chatsApi.util.updateQueryData("getChatHistory", message.chat_id, (draft) => {
                    draft.chat_history.history.push({ content: message.query, role: "user" })
                }))
            }

        }),
        createNewChat: build.mutation<ChatSchema, NewChatProps>({
            query: (props) => ({
                url: "messaging/create_chat",
                method: "POST",
                data: props
            }),
            invalidatesTags: ["Chats"]
        }),
        deleteChat: build.mutation<void, string>({
            query: (chatId) => ({
                url: `messaging/delete_chat/${chatId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Chats"]
        }),
        renameChat: build.mutation<void, { chat_id: string, name: string }>({
            query: (props) => ({
                url: "messaging/rename_chat",
                method: "PATCH",
                data: props
            }),
            invalidatesTags: ["Chats"]
        })
    })
})
