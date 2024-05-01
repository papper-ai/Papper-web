import classNames from "classnames"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { TextField } from "shared/ui/TextField/TextField"
import * as cls from "./MessageSender.module.scss"

interface MessageSenderProps {
    className?: string
}

export const MessageSender = ({ className }: MessageSenderProps) => {
    return (
        <div className={classNames(cls.MessageSender, {}, [className])}>
            <TextField className={cls.textField}/>
            <Button theme={ThemeButton.SECONDARY}>Отправить</Button>
        </div>
    )
}
