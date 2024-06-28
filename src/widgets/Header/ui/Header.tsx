import classNames from "classnames"
import React from "react"
import { Logo, LogoLocation } from "shared/ui/Logo/Logo"
import * as cls from "./Header.module.scss"
interface HeaderProps {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMenuOpen?: boolean
}
export const Header = ({ setIsMenuOpen, isMenuOpen }: HeaderProps) => {
    const burgerMods: Record<string, boolean> = {
        [cls.open]: isMenuOpen
    }
    return (
        <div className={cls.Header}>

            <Logo location={LogoLocation.LEFT} onClick={() => setIsMenuOpen(false)} />
            <div onClick={() => setIsMenuOpen((prev) => !prev)} className={classNames(cls.burger, burgerMods)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
