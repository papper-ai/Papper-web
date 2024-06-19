import classNames from "classnames"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "widgets/Header"
import { Sidebar } from "widgets/Sidebar"
import { fetchUserData } from "entities/User"
import { getVaultsPreview } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./LayoutPage.module.scss"

const LayoutPage = () => {
    const dispatch = useAppDispatch()
    const [width, setWidth] = useState(window.innerWidth)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
    useEffect(() => {
        dispatch(getVaultsPreview({}))
        dispatch(fetchUserData())
    }, [])
    return (
        <div className={classNames(cls.LayoutPage)}>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className={cls.Layout}>
                <Sidebar isMenuOpen={isMenuOpen} width={width} />
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPage
