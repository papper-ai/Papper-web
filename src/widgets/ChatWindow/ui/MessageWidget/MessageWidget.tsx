import { Skeleton } from "antd"
import classNames from "classnames"
import { memo, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { StateSchema } from "app/providers/StoreProvider"
import { fetchChatHistory } from "features/CreateNewChat"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Message } from "shared/ui/Message/Message"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string
}

export const MessageWidget = memo(({ className }: MessageWidgetProps) => {
    const { id } = useParams()
    const chatRef = useRef<HTMLDivElement>(null)
    console.log(id)
    const dispatch = useAppDispatch()
    const currentChat = useSelector((state: StateSchema) => state.currentChat)
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
        <div ref={chatRef} className={classNames(cls.MessageWidget, {}, [className])}>
            {currentChat.isLoading
                ? <Skeleton active />
                : messages?.map((item) => <Message key={Math.random()} sender={item.sender} content={item.content} traceback={item.traceback} />)}
        </div>
    )
})
