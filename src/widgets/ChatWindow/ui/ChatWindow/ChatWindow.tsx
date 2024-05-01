import classNames from "classnames"
import { MessageSender } from "features/MessageSender"
import { MessageWidget } from "../MessageWidget/MessageWidget"
import * as cls from "./ChatWindow.module.scss"

interface ChatWindowProps {
    className?: string
}

export const ChatWindow = ({ className }: ChatWindowProps) => {
    return (
        <div className={classNames(cls.ChatWindow, {}, [className])}>
            <MessageWidget/>
            <MessageSender/>
        </div>
    )
}
