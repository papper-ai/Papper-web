import { Menu, MenuProps, message } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { currentChatActions, NewChatModal } from "features/CreateNewChat"
import { fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { $api } from "shared/api/api"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Logo } from "shared/ui/Logo/Logo"
import { ChatsItem } from "../ChatsItem/ChatsItem"
import "./Sidebar.scss"
type MenuItem = Required<MenuProps>["items"][number]

export const Sidebar = () => {
    const [newChatModal, setNewChatModal] = useState(false)
    const chats = useSelector(getChatsPreview)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { id } = useParams()
    // Поменять эту хуйню блять, а то это пиздец, currentChat нахуй в пиздe
    // Похуй оставляем пока
    const chatSelect = useCallback((chatid: string) => {
        if (chatid === id) return
        dispatch(currentChatActions.setNewChat(chats.find((item) => item.id === chatid)))
        navigate("/main" + "/" + chatid)
    }, [chats, dispatch, navigate, id])
    const chatsItems = useMemo(() => chats.map((item) => ({ key: item.id, label: <ChatsItem messageApi={messageApi} label={item.name} id={item.id} />, onClick: () => chatSelect(item.id) })), [chatSelect, chats, messageApi])

    const handleNewChat = useCallback(() => {
        setNewChatModal(true)
    }, [])
    const handleVault = useCallback(() => {
        navigate(RoutePath[AppRoutes.VAULT])
    }, [navigate])
    const handleQuit = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        navigate(RoutePath[AppRoutes.AUTH])
    }, [navigate])

    const items: MenuItem[] = [
        {
            key: "1",
            label: <Logo />,
            style: { textAlign: "center", height: "60px" }
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
            label: "Выйти",
            danger: true,
            onClick: handleQuit,
            style: { flex: "auto" }
        }
    ]

    return (
        <>
            {contextHolder}
            <Menu
                items={items}
                style={{ height: "100%", width: "300px", flexShrink: 0 }}
                mode="inline"
            />
            <NewChatModal messageApi={messageApi} isOpen={newChatModal} onClose={() => setNewChatModal(false)} />
        </>

    )
}
