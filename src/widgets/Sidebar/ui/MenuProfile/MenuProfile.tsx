import { CameraOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import classNames from "classnames"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "app/providers/AuthProvider"
import { getUserUsername } from "entities/User"
import TakePicture from "shared/assets/icons/AddPhoto.png"
import ExitIcon from "shared/assets/icons/Exit.svg"
import { Text } from "shared/ui/Text/Text"
import { AddPhoto } from "../AddPhotoModal/AddPhotoModal"
import * as cls from "./MenuProfile.module.scss"

interface MenuProfileProps {
    className?: string
}

export const MenuProfile = ({ className }: MenuProfileProps) => {
    const [addPhotoModal, setAddPhotoModal] = useState(false)
    const { logout } = useAuth()
    const username = useSelector(getUserUsername)
    return (
        <>
            <div className={classNames(cls.MenuProfile, {}, [className])}>
                <CameraOutlined onClick={() => setAddPhotoModal(true)} style={{ fontSize: "var(--font-size-xl)", color: "var(--font-color)", marginTop: "4px" }} />
                <div className={cls.username}>{username}</div>
                <Button style={{ padding: "25px" }} type="text" icon={<ExitIcon />} onClick={logout} className={cls.btn} />
            </div>
            <AddPhoto isOpen={addPhotoModal} onClose={() => setAddPhotoModal(false)} />

        </>

    )
}
