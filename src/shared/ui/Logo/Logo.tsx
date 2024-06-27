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
}

export const Logo = memo(({ className, location = LogoLocation.CENTER }: LogoProps) => {
    const navigate = useNavigate()

    const handleClick = useCallback(() => {
        navigate("/main")
    }, [navigate])

    return (
        <img onClick={handleClick} src={Papper} alt="Papper" className={classNames(cls.Logo, cls[location])}/>
    )
})
