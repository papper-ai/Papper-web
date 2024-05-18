import { Empty, message, Skeleton } from "antd"
import classNames from "classnames"
import { memo, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { StateSchema } from "app/providers/StoreProvider"
import { fetchChatHistory, getCurrentChatError } from "features/CreateNewChat"
import { getSendMessageError, getSendMessageIsLoading } from "features/MessageSender"
import { fetchChatsPreview } from "entities/Chat"
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
    const messageIsLoading = useSelector(getSendMessageIsLoading)
    const messageError = useSelector(getSendMessageError)
    const dispatch = useAppDispatch()
    const currentChat = useSelector((state: StateSchema) => state.currentChat)
    const error = useSelector(getCurrentChatError)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    if (error) {
        dispatch(fetchChatsPreview({}))
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
    }, [id, dispatch])
    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
    }, [currentChat])
    const messages = useMemo(() => currentChat?.chat?.chat_history?.history?.map((item) => {
        return { content: item.content, sender: item.role, traceback: item.traceback }
    }), [currentChat])
    return (
        <>
            {contextHolder}
            <div ref={chatRef} className={classNames(cls.MessageWidget, {}, [className])}>
                {currentChat.isLoading
                    ? <Skeleton active />
                    : messages?.length > 0
                        ? (<>

                            {messages?.map((item) => <Message key={Math.random()} sender={item.sender} content={item.content} traceback={item.traceback} />)}
                            {messageIsLoading && <Skeleton avatar paragraph={{ rows: 3 }} active />}
                        </>)
                        : <EmptyChat />}
            </div>
        </>
    )
})
