import classNames from "classnames"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { List } from "shared/ui/List/List"
import { Logo } from "shared/ui/Logo/Logo"
import { Modal } from "shared/ui/Modal/Modal"
import * as cls from "./Sidebar.module.scss"

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [newChatModal, setNewChatModal] = useState(false)
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
            <List/>
            <Modal onClose={() => setNewChatModal(false)} isOpen={newChatModal}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque minima, optio ipsam nisi dolore necessitatibus sequi labore, aut temporibus quaerat reprehenderit eaque tempore fuga obcaecati consequuntur cum sunt libero atque!</Modal>
        </div>
    )
}
