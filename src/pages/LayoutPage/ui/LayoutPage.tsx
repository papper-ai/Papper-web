import classNames from "classnames"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Sidebar } from "widgets/Sidebar"
import { fetchChatsPreview, getChatsPreview } from "entities/Chat"
import { getVaults, getVaultsPreview } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./LayoutPage.module.scss"

const LayoutPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getVaultsPreview({}))
        dispatch(fetchChatsPreview({}))
    }, [])
    return (
        <div className={classNames(cls.LayoutPage)}>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default LayoutPage
