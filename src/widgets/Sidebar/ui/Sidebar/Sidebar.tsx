import { Menu, MenuProps } from "antd"
import classNames from "classnames"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import type { StateSchema } from "app/providers/StoreProvider"
import { currentChatActions, NewChatModal } from "features/CreateNewChat"
import { ChatSchema, fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { List } from "shared/ui/List/List"
import { Logo } from "shared/ui/Logo/Logo"
import * as cls from "./Sidebar.module.scss"
import { useAppSelector } from "shared/hooks/useAppSelector"

type MenuItem = Required<MenuProps>["items"][number]
function equal (a: ChatSchema[], b: ChatSchema[]) {
    console.log(a, b)
    return a?.length === b?.length
}

export const Sidebar = () => {
    const [newChatModal, setNewChatModal] = useState(false)
    const chats = useSelector((state: StateSchema) => state.chats.chats)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const chatSelect = (id: string) => {
        dispatch(currentChatActions.setNewChat(chats.find((item) => item.id === id)))
        navigate("/main" + "/" + id)
    }
    const handleNewChat = useCallback(() => {
        setNewChatModal(true)
    }, [])
    console.log(chats)
    useEffect(() => {
        async function fetchData () {
            const result = await dispatch(fetchChatsPreview({ }))
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
            children: chats.map((item) => { return { key: item.id, label: item.name, onClick: () => chatSelect(item.id) } })
        },
        {
            key: "5",
            label: "Выйти",
            danger: true,
            onClick: handleQuit,
            style: { marginTop: "auto" }
        }
    ]

    return (
        // <div className={classNames(cls.Sidebar, {}, [className])}>
        //     <Logo/>
        //     <Button onClick={handleNewChat} theme={ThemeButton.LIST} className={"newChatBtn"}>Создать новый чат</Button>
        //     <Button onClick={handleVault} theme={ThemeButton.LIST} className={"newChatBtn"}>Ваши документы</Button>
        //     <List items={chatsItems}/>
        //     <Button onClick={handleQuit} theme={ThemeButton.LIST} className={"newChatBtn"}>Выйти</Button>
        // </div>
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
