import classNames from "classnames"
import { FC } from "react"
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

export const Button: FC<ButtonProps> = (props) => {
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
}
