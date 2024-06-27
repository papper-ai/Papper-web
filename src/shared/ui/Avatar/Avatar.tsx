import { RobotOutlined, UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import type { IRole } from "entities/Chat"
import * as cls from "./Avatar.module.scss"

interface AvatarProps {
    className?: string
    theme?: IRole
}

export const Avatar = ({ className, theme }: AvatarProps) => {
    const avatarStyle = { fontSize: 30, color: "white" }
    return (
        <div className={classNames(cls.Avatar, {}, [className, cls[theme || "user"]])}>
            {theme === "user"
                ? <UserOutlined style={avatarStyle} />
                : <RobotOutlined style={avatarStyle} />}
        </div>
    )
}
