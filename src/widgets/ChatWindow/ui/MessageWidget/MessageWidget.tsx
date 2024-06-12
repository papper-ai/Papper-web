import { Empty, message, Skeleton } from "antd"
import classNames from "classnames"
import { memo, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { StateSchema } from "app/providers/StoreProvider"
import { getSendMessageError, getSendMessageIsLoading } from "features/MessageSender"
import { chatsApi, fetchChatHistory, fetchChatsPreview, getChatsHistoryError, getChatsHistoryLoading, getChatsPreview, getCurrentChat } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Message } from "shared/ui/Message/Message"
import { EmptyChat } from "../EmptyChat/EmptyChat"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string
}

export const MessageWidget = memo(({ className }: MessageWidgetProps) => {
    const { id } = useParams()
    const chatRef = useRef<HTMLDivElement>(null)
    const [sendMessage, { isLoading: messageIsLoading, error: messageError }] = chatsApi.useSendMessageMutation()
    const dispatch = useAppDispatch()
    const { data: currentChat, error: chatError, isLoading } = chatsApi.useGetChatHistoryQuery(id)
    const [messageApi, contextHolder] = message.useMessage()
    const chats = useSelector(getChatsPreview)
    const navigate = useNavigate()
    if (chatError) {
        dispatch(fetchChatsPreview())
        navigate(RoutePath[AppRoutes.MAIN])
        messageApi.error({
            content: "Чат не найден",
            duration: 2
        })
    }
    useEffect(() => {
        if (messageError) {
            messageApi.error({
                content: "Произошла ошибка при отправке сообщения",
                duration: 2
            })
        }
    }, [messageApi, messageError])
    useEffect(() => {
        if (id) {
            dispatch(fetchChatHistory({ chatId: id }))
        }
    }, [id, dispatch, chats])
    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
    }, [currentChat])
    const messages = useMemo(() => currentChat?.chat_history?.history?.map((item) => {
        return { content: item.content, sender: item.role, traceback: item.traceback }
    }), [currentChat])
    return (
        <>
            {contextHolder}
            <div ref={chatRef} className={classNames(cls.MessageWidget, {}, [className])}>
                {isLoading
                    ? <Skeleton active />
                    : (messages?.length && messages?.length > 0)
                        ? (<>

                            {messages?.map((item) => <Message key={Math.random()} sender={item.sender} content={item.content} traceback={item.traceback} />)}
                            {messageIsLoading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
                        </>)
                        : <EmptyChat />}
            </div>
        </>
    )
})
