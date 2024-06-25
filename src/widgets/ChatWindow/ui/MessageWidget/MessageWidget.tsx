import { message, Skeleton } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import classNames from "classnames"
import { memo, useEffect, useMemo, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { chatsApi } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Message } from "shared/ui/Message/Message"
import { EmptyChat } from "../EmptyChat/EmptyChat"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string;
    messageApi?: MessageInstance;
}

export const MessageWidget = memo(({ className, messageApi }: MessageWidgetProps) => {
    const { id } = useParams()
    const chatRef = useRef<HTMLDivElement>(null)
    const [, { isLoading: messageIsLoading, error: messageError }] = chatsApi.useSendMessageMutation({ fixedCacheKey: "sendMessage" })
    console.log(messageIsLoading, messageError)
    const { data: currentChat, error: chatError, isLoading } = chatsApi.useGetChatHistoryQuery(id)
    const navigate = useNavigate()
    if (chatError) {
        if ("data" in chatError) {
            messageApi.error({
                content: chatError.data,
                duration: 2
            })
        } else {
            // Обработка SerializedError или других типов ошибок
            messageApi.error({
                content: "Произошла ошибка при получении чата",
                duration: 2
            })
        }
        navigate(RoutePath[AppRoutes.MAIN]) 
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
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
    }, [currentChat])
    const messages = useMemo(() => currentChat?.chat_history?.history?.map((item) => {
        return { content: item.content, sender: item.role, traceback: item.traceback }
    }), [currentChat])
    return (
        <>
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
