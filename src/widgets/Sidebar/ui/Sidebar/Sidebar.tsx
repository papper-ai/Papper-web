import { PlusCircleOutlined } from "@ant-design/icons"
import { Menu, MenuProps, message } from "antd"
import classNames from "classnames"
import { useCallback, useMemo, useState } from "react"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { NewChatModal } from "features/CreateNewChat"
import { chatsApi } from "entities/Chat"
import Chats from "shared/assets/icons/Chats.svg"
import VaultIcon from "shared/assets/icons/VaultIcon.svg"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Logo } from "shared/ui/Logo/Logo"
import { ChatsItem } from "../ChatsItem/ChatsItem"
import { MenuProfile } from "../MenuProfile/MenuProfile"
import * as cls from "./Sidebar.module.scss"

type MenuItem = Required<MenuProps>["items"][number]

const MenuKeys = {
    [RoutePath[AppRoutes.MAIN]]: "1",
    [RoutePath[AppRoutes.VAULT]]: "3"
}
interface SidebarProps {
    width?: number
    isMenuOpen?: boolean
    setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
export const Sidebar = ({ width, isMenuOpen, setIsMenuOpen }: SidebarProps) => {
    const [newChatModal, setNewChatModal] = useState(false)
    const { data: chats } = chatsApi.useGetChatsPreviewQuery()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { id } = useParams()
    const location = useLocation()
    // Поменять эту хуйню блять, а то это пиздец, currentChat нахуй в пиздe
    // Похуй оставляем пока
    const chatSelect = useCallback(async (chatId: string) => {
        if (chatId === id) return
        console.log(chatId)
        setIsMenuOpen?.(false)
        navigate("/main" + "/" + chatId)
    }, [navigate, id, setIsMenuOpen])
    const chatsItems = useMemo(() => chats?.map((item) => ({ key: item.id, label: <ChatsItem messageApi={messageApi} label={item.name} id={item.id} />, onClick: () => chatSelect(item.id) })), [chatSelect, chats, messageApi])

    const handleNewChat = useCallback(() => {
        setIsMenuOpen?.(false)
        setNewChatModal(true)
    }, [])
    const handleVault = useCallback(() => {
        setIsMenuOpen?.(false)
        navigate(RoutePath[AppRoutes.VAULT])
    }, [navigate, setIsMenuOpen])

    const items: MenuItem[] = [
        {
            key: "1",
            label: <Logo />,
            style: { display: (width < 992 ? "none" : "block"), textAlign: "center", height: "auto", cursor: "pointer" },
            disabled: true
        },
        {
            key: "2",
            icon: <PlusCircleOutlined style={{ fontSize: "20px", marginTop: "4px" }} />,
            label: "Создать новый чат",
            onClick: handleNewChat
        },
        {
            key: "3",
            icon: <VaultIcon style={{ marginTop: "2px" }} />,
            label: <NavLink to={RoutePath[AppRoutes.VAULT]}>Хранилища</NavLink>,
            onClick: handleVault
        },
        {
            key: "4",
            icon: <Chats style={{ marginTop: "4px" }} />,
            label: "Чаты",
            children: chatsItems
        },
        {
            key: "5",
            label: <MenuProfile />,
            style: { position: "absolute", padding: "0 10 0 10", margin: "0 auto", bottom: 10, cursor: "auto", width: "100%", height: "auto" },
            disabled: true
        }
    ]

    const menuMods = {
        [cls.menuOpen]: isMenuOpen
    }
    return (
        <>
            {contextHolder}
            <Menu
                className={classNames(cls.Menu, menuMods)}
                items={items}
                mode="inline"
                openKeys={["4"]}
                selectedKeys={[MenuKeys[location.pathname], id || ""]}
            />
            <NewChatModal messageApi={messageApi} isOpen={newChatModal} onClose={() => setNewChatModal(false)} />
        </>

    )
}
