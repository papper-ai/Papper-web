import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import Papper from "../../assets/images/Papper.png"
import * as cls from "./Logo.module.scss"

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
