import classNames from "classnames"
import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Papper from "../../assets/images/Papper.png"
import * as cls from "./Logo.module.scss"

export enum LogoLocation {
    CENTER = "center",
    LEFT = "left",
}
interface LogoProps {
    className?: string
    location?: LogoLocation
    onClick?: () => void
}

export const Logo = memo(({ onClick, location = LogoLocation.CENTER }: LogoProps) => {
    const navigate = useNavigate()

    const handleClick = useCallback(() => {
        navigate("/main")
        onClick?.()
    }, [navigate, onClick])

    return (
        <img onClick={handleClick} src={Papper} alt="Papper" className={classNames(cls.Logo, cls[location])}/>
    )
})
