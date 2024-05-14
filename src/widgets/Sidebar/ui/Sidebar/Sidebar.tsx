import { Menu, MenuProps } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { currentChatActions, NewChatModal } from "features/CreateNewChat"
import { fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Logo } from "shared/ui/Logo/Logo"

type MenuItem = Required<MenuProps>["items"][number]

export const Sidebar = () => {
    const [newChatModal, setNewChatModal] = useState(false)
    const chats = useSelector(getChatsPreview)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const chatSelect = useCallback((id: string) => {
        dispatch(currentChatActions.setNewChat(chats.find((item) => item.id === id)))
        navigate("/main" + "/" + id)
    }, [chats, dispatch, navigate])
    const chatsItems = useMemo(() => chats.map((item) => ({ key: item.id, label: item.name, onClick: () => chatSelect(item.id) })), [chatSelect, chats])

    const handleNewChat = useCallback(() => {
        setNewChatModal(true)
    }, [])
    console.log(chats)
    useEffect(() => {
        async function fetchData () {
            const result = await dispatch(fetchChatsPreview({}))
            console.log(result)
        }
        fetchData()
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
            label: <NavLink to={RoutePath[AppRoutes.VAULT]}>Ваши документы</NavLink>,
            onClick: handleVault
        },
        {
            key: "4",
            label: "Чаты",
            children: chatsItems,
            style: {maxHeight: "350px", overflow: "auto"}
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
            <Menu
                items={items}
                style={{ height: "100%", width: "300px", flexShrink: 0 }}
                mode="inline"
            />
            <NewChatModal isOpen={newChatModal} onClose={() => setNewChatModal(false)} />
        </>

    )
}
