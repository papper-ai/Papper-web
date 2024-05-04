import classNames from "classnames"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchChatHistory, getCurrentChat } from "features/CreateNewChat"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Message } from "shared/ui/Message/Message"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string
}

export const MessageWidget = ({ className }: MessageWidgetProps) => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const currentChat = useSelector(getCurrentChat)
    useEffect(() => {
        dispatch(fetchChatHistory({ chatId: id }))
    }, [id, dispatch])
    const messages = currentChat?.chat_history?.history?.map((item) => {
        return { content: item.content, sender: item.role }
    })
    return (
        <div className={classNames(cls.MessageWidget, {}, [className])}>
            {messages?.map((item) => <Message key={item.content} sender={item.sender} content={item.content}/>) }
        </div>
    )
}
