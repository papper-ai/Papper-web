import classNames from "classnames"
import { Message, Sender } from "shared/ui/Message/Message"
import * as cls from "./MessageWidget.module.scss"

interface MessageWidgetProps {
    className?: string
}

export const MessageWidget = ({ className }: MessageWidgetProps) => {
    return (
        <div className={classNames(cls.MessageWidget, {}, [className])}>
            <Message sender={Sender.BOT}/>
            <Message sender={Sender.USER}/>
        </div>
    )
}
