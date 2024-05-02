import classNames from "classnames"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { NewChatModal } from "features/CreateNewChat"
import { getChatsPreview } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { List } from "shared/ui/List/List"
import { Logo } from "shared/ui/Logo/Logo"
import * as cls from "./Sidebar.module.scss"

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [newChatModal, setNewChatModal] = useState(false)
    const chats = useSelector(getChatsPreview)
    const navigate = useNavigate()
    const handleNewChat = () => {
        setNewChatModal(true)
    }
    const handleVault = () => {
        navigate(RoutePath[AppRoutes.VAULT])
    }
    return (
        <div className={classNames(cls.Sidebar, {}, [className])}>
            <Logo/>
            <Button onClick={handleNewChat} theme={ThemeButton.LIST} className={"newChatBtn"}>Создать новый чат</Button>
            <Button onClick={handleVault} theme={ThemeButton.LIST} className={"newChatBtn"}>Ваши документы</Button>
            <List items={chats.map((item) => item.name)}/>
            <NewChatModal isOpen={newChatModal} onClose={() => setNewChatModal(false)}/>
        </div>
    )
}
