import { UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import type { IRole } from "entities/Chat"
import { Avatar } from "../Avatar/Avatar"
import * as cls from "./Message.module.scss"

interface MessageProps {
    className?: string
    sender?: IRole
    content?: string
}

export const Message = ({ className, sender, content }: MessageProps) => {
    return (
        <div className={classNames(cls.Message, {}, [className, cls[sender]])}>
            <Avatar theme={sender}/>
            <div className={cls.content}>
                {content}
            </div>
        </div>
    )
}
