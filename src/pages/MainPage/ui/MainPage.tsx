import classNames from "classnames"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ChatWindow } from "widgets/ChatWindow"
import { Sidebar } from "widgets/Sidebar"
import { currentChatActions } from "features/CreateNewChat"
import { fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { getVaultsPreview } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./MainPage.module.scss"
interface MainPageProps {
    className?: string
}
const MainPage = ({ className }: MainPageProps) => {
    const dispatch = useAppDispatch()
    const chatsPreview = useSelector(getChatsPreview)
    useEffect(() => {
        dispatch(fetchChatsPreview({}))
        dispatch(getVaultsPreview({}))
    }, [])

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Sidebar />
            <ChatWindow/>
        </div>
    )
}

export default MainPage
