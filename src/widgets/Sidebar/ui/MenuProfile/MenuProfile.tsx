import { Avatar, Button } from "antd"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { useAuth } from "app/providers/AuthProvider"
import { getUserUsername } from "entities/User"
import ExitIcon from "shared/assets/icons/Exit.svg"
import { Text } from "shared/ui/Text/Text"
import * as cls from "./MenuProfile.module.scss"
interface MenuProfileProps {
    className?: string
}

export const MenuProfile = ({ className }: MenuProfileProps) => {
    const { logout } = useAuth()
    const username = useSelector(getUserUsername)
    return (
        <div className={classNames(cls.MenuProfile, {}, [className])}>
            <Avatar shape="square" size={64} />
            <div className={cls.username}>{username}</div>
            <Button style={{ padding: "25px" }} type="text" icon={<ExitIcon />} onClick={logout} className={cls.btn} />
        </div>
    )
}
