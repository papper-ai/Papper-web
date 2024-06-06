import { Menu, MenuProps, message } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "app/providers/AuthProvider"
import { fetchChatHistory, getChatsPreview } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Logo } from "shared/ui/Logo/Logo"
import { ChatsItem } from "../ChatsItem/ChatsItem"
import "./Sidebar.scss"
import { MenuProfile } from "../MenuProfile/MenuProfile"

type MenuItem = Required<MenuProps>["items"][number]

const MenuKeys = {
    [RoutePath[AppRoutes.MAIN]]: "1",
    [RoutePath[AppRoutes.VAULT]]: "3"
}

export const Sidebar = () => {
    const [newChatModal, setNewChatModal] = useState(false)
    const chats = useSelector(getChatsPreview)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { id } = useParams()
    const { logout } = useAuth()
    const location = useLocation()
    console.log()
    // Поменять эту хуйню блять, а то это пиздец, currentChat нахуй в пиздe
    // Похуй оставляем пока
    const chatSelect = useCallback(async (chatId: string) => {
        if (chatId === id) return
        console.log(chatId)
        await dispatch(fetchChatHistory({ chatId }))
        navigate("/main" + "/" + chatId)
    }, [chats, dispatch, navigate, id])
    const chatsItems = useMemo(() => chats.map((item) => ({ key: item.id, label: <ChatsItem messageApi={messageApi} label={item.name} id={item.id} />, onClick: () => chatSelect(item.id) })), [chatSelect, chats, messageApi])

    const handleNewChat = useCallback(() => {
        setNewChatModal(true)
    }, [])
    const handleVault = useCallback(() => {
        navigate(RoutePath[AppRoutes.VAULT])
    }, [navigate])
    const handleQuit = useCallback(() => {
        logout()
    }, [navigate])

    const items: MenuItem[] = [
        {
            key: "1",
            label: <Logo />,
            style: { textAlign: "center", height: "auto", cursor: "pointer" },
            disabled: true
        },
        {
            key: "2",
            label: "Создать новый чат",
            onClick: handleNewChat
        },
        {
            key: "3",
            label: <NavLink to={RoutePath[AppRoutes.VAULT]}>Хранилища</NavLink>,
            onClick: handleVault
        },
        {
            key: "4",
            label: "Чаты",
            children: chatsItems
        },
        {
            key: "5",
            label: <MenuProfile />,
            style: { position: "absolute", bottom: 10, left: 0, cursor: "auto", height: "auto" },
            disabled: true
        }
    ]

    return (
        <>
            {contextHolder}
            <Menu
                items={items}
                style={{ height: "100%", width: "350px", flexShrink: 0, position: "relative", border: "none", borderRadius: "20px", backgroundColor: "var(--bg-color)" }}
                mode="inline"
                openKeys={["4"]}
                selectedKeys={[MenuKeys[location.pathname], id]}
            />
            {/* <NewChatModal messageApi={messageApi} isOpen={newChatModal} onClose={() => setNewChatModal(false)} /> */}
        </>

    )
}
