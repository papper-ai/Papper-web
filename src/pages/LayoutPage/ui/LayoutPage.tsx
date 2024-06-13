import classNames from "classnames"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "widgets/Sidebar"
import { fetchUserData } from "entities/User"
import { getVaultsPreview } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./LayoutPage.module.scss"

const LayoutPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getVaultsPreview({}))
        dispatch(fetchUserData())
    }, [])
    return (
        <div className={classNames(cls.LayoutPage)}>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default LayoutPage
