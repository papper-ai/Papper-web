import { CameraOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import classNames from "classnames"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "app/providers/AuthProvider"
import { chatsApi } from "entities/Chat"
import { getUserUsername } from "entities/User"
import ExitIcon from "shared/assets/icons/Exit.svg"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { AddPhoto } from "../AddPhotoModal/AddPhotoModal"
import * as cls from "./MenuProfile.module.scss"
interface MenuProfileProps {
    className?: string
}

export const MenuProfile = ({ className }: MenuProfileProps) => {
    const [addPhotoModal, setAddPhotoModal] = useState(false)
    const { logout } = useAuth()
    const dispatch = useAppDispatch()
    const username = useSelector(getUserUsername)
    return (
        <>
            <div className={classNames(cls.MenuProfile, {}, [className])}>
                <Avatar shape="square" size="large" icon={<UserOutlined />} />
                <div className={cls.username}>{username}</div>
                <Button style={{ padding: "25px" }} type="text" icon={<ExitIcon />} onClick={() => { dispatch(chatsApi.util.resetApiState()); logout() }} className={cls.btn} />
            </div>
            <AddPhoto isOpen={addPhotoModal} onClose={() => setAddPhotoModal(false)} />

        </>

    )
}
