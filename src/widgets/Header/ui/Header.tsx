import { Logo } from "shared/ui/Logo/Logo"
import * as cls from "./Header.module.scss"

export const Header = () => {
    return (
        <div className={cls.Header}>
            <div className={cls.burger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Logo />
        </div>
    )
}
