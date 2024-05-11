import classNames from "classnames"
import { memo } from "react"
import { MessageSender } from "features/MessageSender"
import { MessageWidget } from "../MessageWidget/MessageWidget"
import * as cls from "./ChatWindow.module.scss"

interface ChatWindowProps {
    className?: string
}

export const ChatWindow = memo(({ className }: ChatWindowProps) => {
    return (
        <div className={classNames(cls.ChatWindow, {}, [className])}>
            <MessageWidget/>
            <MessageSender/>
        </div>
    )
})
