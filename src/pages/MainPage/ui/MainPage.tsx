import classNames from "classnames"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ChatWindow } from "widgets/ChatWindow"
import { Sidebar } from "widgets/Sidebar"
import { currentChatActions } from "features/CreateNewChat"
import { fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { getVaultsPreview } from "entities/Vault"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./MainPage.module.scss"
interface MainPageProps {
    className?: string
}
const MainPage = ({ className }: MainPageProps) => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const chatsPreview = useSelector(getChatsPreview)
    useEffect(() => {
        dispatch(fetchChatsPreview({}))
        dispatch(getVaultsPreview({}))
    }, [dispatch])

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Sidebar />
            <ChatWindow/>
        </div>
    )
}

export default MainPage
