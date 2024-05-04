import classNames from "classnames"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getCurrentChat } from "features/CreateNewChat"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { TextField } from "shared/ui/TextField/TextField"
import { sendMessage } from "../model/services/sendMessage"
import * as cls from "./MessageSender.module.scss"

interface MessageSenderProps {
    className?: string
}

export const MessageSender = ({ className }: MessageSenderProps) => {
    const dispatch = useAppDispatch()
    const currentChat = useSelector(getCurrentChat)
    const [message, setMessage] = useState("")
    const sendMessageHandle = async () => {
        const result = dispatch(sendMessage({ chatId: currentChat.id, vaultId: currentChat.vault_id, query: message }))
        if (result) {
            console.log()
        }
    }
    return (
        <div className={classNames(cls.MessageSender, {}, [className])}>
            <TextField value={message} onChange={(e) => setMessage(e.target.value)} className={cls.textField}/>
            <Button onClick={sendMessageHandle} theme={ThemeButton.SECONDARY}>Отправить</Button>
        </div>
    )
}
