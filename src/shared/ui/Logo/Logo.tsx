import classNames from "classnames"
import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Papper from "../../assets/images/Papper.png"
import * as cls from "./Logo.module.scss"

interface LogoProps {
    className?: string
}

export const Logo = memo(({ className }: LogoProps) => {
    const navigate = useNavigate()

    const handleClick = useCallback(() => {
        navigate("/main")
    }, [navigate])

    return (
        <img onClick={handleClick} src={Papper} alt="Papper" className={cls.Logo}/>
    )
})
