import classNames from "classnames"
import { useEffect } from "react"
import { ChatWindow } from "widgets/ChatWindow"
import { Sidebar } from "widgets/Sidebar"
import { getChatsPreview } from "entities/Chat"
import { getVaultsPreview } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./MainPage.module.scss"
interface MainPageProps {
    className?: string
}
const MainPage = ({ className }: MainPageProps) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getChatsPreview({}))
        dispatch(getVaultsPreview({}))
    })

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Sidebar />
            <ChatWindow/>
        </div>
    )
}

export default MainPage
