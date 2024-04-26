import classNames from "classnames"
import * as cls from "./Logo.module.scss"
import Papper from "../../assets/images/Papper.png"
import { useNavigate } from "react-router-dom"

interface LogoProps {
    className?: string
}

export const Logo = ({ className }: LogoProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/main")
    }

    return (
        <img onClick={handleClick} src={Papper} alt="" className={cls.Logo}/>
    )
}
