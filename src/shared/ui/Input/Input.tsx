import classNames from "classnames"
import * as cls from "./Input.module.scss"
import { FC } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input: FC<InputProps> = (props) => {
    const {
        className,
        ...otherProps
    } = props

    return (
        <input {...otherProps} className={classNames(cls.Input, className)} />
    )
}
