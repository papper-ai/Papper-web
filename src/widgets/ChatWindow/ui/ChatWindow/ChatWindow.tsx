import classNames from "classnames"
import { memo } from "react"
import { useParams } from "react-router-dom"
import { MessageSender } from "features/MessageSender"
import { MainWindow } from "../../../MainWindow"
import { ChatInfo } from "../ChatInfo/ChatInfo"
import { MessageWidget } from "../MessageWidget/MessageWidget"
import * as cls from "./ChatWindow.module.scss"
import { message } from "antd"

interface ChatWindowProps {
    className?: string
}

export const ChatWindow = memo(({ className }: ChatWindowProps) => {
    const { id } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    return (
        <>
            {contextHolder}
            <div className={classNames(cls.ChatWindow, {}, [className])}>
                {id
                    ? (
                        <>
                            <ChatInfo />
                            <MessageWidget messageApi={messageApi} />
                            <MessageSender />
                        </>
                    )
                    : <MainWindow />

                }
            </div>
        </>
    )
})
