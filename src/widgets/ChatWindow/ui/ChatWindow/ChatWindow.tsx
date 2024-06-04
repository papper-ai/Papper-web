import classNames from "classnames"
import { memo } from "react"
import { useParams } from "react-router-dom"
import { MainWindow } from "widgets/MainWindow"
import { MessageSender } from "features/MessageSender"
import { MessageWidget } from "../MessageWidget/MessageWidget"
import * as cls from "./ChatWindow.module.scss"
import { ChatInfo } from "../ChatInfo/ChatInfo"

interface ChatWindowProps {
    className?: string
}

export const ChatWindow = memo(({ className }: ChatWindowProps) => {
    const { id } = useParams()

    return (
        <div className={classNames(cls.ChatWindow, {}, [className])}>
            {id
                ? (
                    <>
                        <ChatInfo />
                        <MessageWidget />
                        <MessageSender />
                    </>
                )
                : <MainWindow />

            }
        </div>
    )
})
