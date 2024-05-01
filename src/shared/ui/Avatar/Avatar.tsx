import { RobotOutlined, UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import { Sender } from "../Message/Message"
import * as cls from "./Avatar.module.scss"

interface AvatarProps {
    className?: string
    theme?: Sender
}

export const Avatar = ({ className, theme }: AvatarProps) => {
    const avatarStyle = { fontSize: 30, color: "white" }
    return (
        <div className={classNames(cls.Avatar, {}, [className, cls[theme]])}>
            {theme === Sender.USER
                ? <UserOutlined style={avatarStyle} />
                : <RobotOutlined style={avatarStyle} />}
        </div>
    )
}
