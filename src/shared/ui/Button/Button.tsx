import classNames from "classnames"
import { FC, memo } from "react"
import * as cls from "./Button.module.scss"

export enum ThemeButton {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    LIST = "list"
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme?: ThemeButton
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        ...otherProps
    } = props

    return (
        <button {...otherProps} className={classNames(cls.Button, cls[theme], className)}>
            {children}
        </button>
    )
})
