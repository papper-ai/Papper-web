import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react"
import { AxiosError, AxiosRequestConfig } from "axios"
import { $api } from "shared/api/api"
import { ChatSchema, AnswerSchema, SendMessageProps, NewChatProps } from "../types/ChatSchema"
interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
}
type BaseQueryError = { status: number; data: any }
const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<AxiosBaseQueryArgs, unknown, BaseQueryError> =>

    async ({ url, params, method, data }) => {
        try {
            const result = await $api({ url: baseUrl + url, params, method, data })
            return { data: result.data }
        } catch (axiosError) {
            const err = axiosError as AxiosError
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
                url: "/messaging/chats/preview",
                method: "GET"
            }),
            providesTags: result => ["Chats"]
        }),
        getChatHistory: build.query<ChatSchema, string>({
            query: (chatId) => ({
                url: `/messaging/chat/${chatId}`,
                method: "GET"
            })
        }),
        sendMessage: build.mutation<AnswerSchema, SendMessageProps>({
            query: (props) => ({
                url: "/qa/generation",
                method: "POST",
                data: props
            }),
            async onQueryStarted (message, { dispatch, queryFulfilled }) {
                console.log(message)
                dispatch(chatsApi.util.updateQueryData("getChatHistory", message.chat_id, (draft) => {
                    console.log(draft.id)
                    draft.chat_history.history.push({ content: message.query, role: "user" })
                }))

                try {
                    dispatch(chatsApi.util.updateQueryData("getChatHistory", message.chat_id, (draft) => {
                        draft.chat_history.history.push(
                            {
                                content: "asdasdasdad",
                                role: "ai",
                                traceback: [{
                                    document_id: "1",
                                    information: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus doloremque vero nulla quidem odit. Expedita ad dolor, temporibus natus possimus quia inventore. Eveniet eos accusantium ea pariatur quae. Numquam, eum?",
                                    document_name: "AADADADADADADADADADsl;adldsaldkas;dkasdal;skdasldklasdkals;dksa;dlkas;ldkas;ldk;as"
                                },
                                {
                                    document_id: "1",
                                    information: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus doloremque vero nulla quidem odit. Expedita ad dolor, temporibus natus possimus quia inventore. Eveniet eos accusantium ea pariatur quae. Numquam, eum?",
                                    document_name: "asdasdasdad"
                                },
                                {
                                    document_id: "1",
                                    information: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus doloremque vero nulla quidem odit. Expedita ad dolor, temporibus natus possimus quia inventore. Eveniet eos accusantium ea pariatur quae. Numquam, eum?",
                                    document_name: "asdasdasdad"
                                }
                                ]
                            })
                    }))
                } catch (e) {
                    console.log(e)
                }
            }

        }),
        createNewChat: build.mutation<ChatSchema, NewChatProps>({
            query: (props) => ({
                url: "/messaging/chat",
                method: "POST",
                data: props
            }),
            invalidatesTags: ["Chats"]
        }),
        deleteChat: build.mutation<void, string>({
            query: (chatId) => ({
                url: `/messaging/chat/${chatId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Chats"]
        }),
        renameChat: build.mutation<void, { chat_id: string, name: string }>({
            query: (props) => ({
                url: "/messaging/chat/renaming",
                method: "PATCH",
                data: props
            }),
            invalidatesTags: ["Chats"]
        })
    })
})
