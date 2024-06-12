import { SendOutlined } from "@ant-design/icons"
import { Button } from "antd"
import classNames from "classnames"
import { memo, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { StateSchema } from "app/providers/StoreProvider"
import { chatsApi, getCurrentChat } from "entities/Chat"
import { TextField } from "shared/ui/TextField/TextField"
import * as cls from "./MessageSender.module.scss"

interface MessageSenderProps {
    className?: string
}

export const MessageSender = memo(({ className }: MessageSenderProps) => {
    const { id } = useParams()
    const [sendMessage, { isLoading }] = chatsApi.useSendMessageMutation({ fixedCacheKey: "sendMessage" })

    const currentChat = useSelector((state: StateSchema) => getCurrentChat(id, state))
    const [message, setMessage] = useState("")
    const sendMessageHandle = async () => {
        const result = await sendMessage({ chat_id: id, vault_id: currentChat?.vault_id, query: message })
        console.log(result)
        if (result) {
            setMessage("")
        }
    }
    const handleChangeTextField = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }, [setMessage])
    return (
        <div className={classNames(cls.MessageSender, {}, [className])}>
            <TextField disabled={isLoading} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { sendMessageHandle() } }} value={message} onChange={handleChangeTextField} className={cls.textField} />
            <Button size="large" disabled={isLoading} className={cls.button} type="text" onClick={sendMessageHandle} icon={<SendOutlined style={{ color: "var(--primary-color)", fontSize: "var(--font-size-l)" }} />} />
        </div>
    )
})
