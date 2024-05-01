import { UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import { Avatar } from "../Avatar/Avatar"
import * as cls from "./Message.module.scss"

export enum Sender{
    USER = "user",
    BOT = "bot"
}

interface MessageProps {
    className?: string
    sender: Sender
}

export const Message = ({ className, sender }: MessageProps) => {
    return (
        <div className={classNames(cls.Message, {}, [className, cls[sender]])}>
            <Avatar theme={sender}/>
            <div className={cls.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nobis quam cumque, provident ab natus voluptate fugit amet pariatur, odio tenetur laboriosam facilis itaque iure delectus hic esse adipisci nam?
            </div>
        </div>
    )
}
