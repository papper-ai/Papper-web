import { SendOutlined } from "@ant-design/icons"
import { Button } from "antd"
import classNames from "classnames"
import { memo, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { getCurrentChat } from "features/CreateNewChat"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { TextField } from "shared/ui/TextField/TextField"
import { getSendMessageIsLoading } from "../model/selectors/getSendMessageIsLoading"
import { sendMessage } from "../model/services/sendMessage"
import * as cls from "./MessageSender.module.scss"

interface MessageSenderProps {
    className?: string
}

export const MessageSender = memo(({ className }: MessageSenderProps) => {
    const dispatch = useAppDispatch()
    const currentChat = useSelector(getCurrentChat)
    const [message, setMessage] = useState("")
    const isLoading = useSelector(getSendMessageIsLoading)
    const sendMessageHandle = async () => {
        const result = await dispatch(sendMessage({ chatId: currentChat.id, vaultId: currentChat.vault_id, query: message }))
        if (result) {
            console.log()
        }
    }
    const handleChangeTextField = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }, [setMessage])
    return (
        <div className={classNames(cls.MessageSender, {}, [className])}>
            <TextField value={message} onChange={handleChangeTextField} className={cls.textField} />
            <Button size="large" disabled={isLoading} className={cls.button} type="text" onClick={sendMessageHandle} icon={<SendOutlined style={{ color: "var(--primary-color)", fontSize: "var(--font-size-l)" }} />} />
        </div>
    )
})
