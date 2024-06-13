import { message, Skeleton } from "antd"
import classNames from "classnames"
import { memo, useEffect, useMemo, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { chatsApi } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Message } from "shared/ui/Message/Message"
import { EmptyChat } from "../EmptyChat/EmptyChat"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string
}

export const MessageWidget = memo(({ className }: MessageWidgetProps) => {
    const { id } = useParams()
    const chatRef = useRef<HTMLDivElement>(null)
    const [, { isLoading: messageIsLoading, error: messageError }] = chatsApi.useSendMessageMutation({ fixedCacheKey: "sendMessage" })
    console.log(messageIsLoading, messageError)
    const { data: currentChat, error: chatError, isLoading } = chatsApi.useGetChatHistoryQuery(id)
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    if (chatError) {
        navigate(RoutePath[AppRoutes.MAIN])
        messageApi.error({
            content: "Чат не найден",
            duration: 2
        })
    }
    useEffect(() => {
        console.log(messageError)
        if (messageError) {
            messageApi.error({
                content: "Произошла ошибка при отправке сообщения",
                duration: 2
            })
        }
    }, [messageApi, messageError])
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
