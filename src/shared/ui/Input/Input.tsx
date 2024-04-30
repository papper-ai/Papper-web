import classNames from "classnames"
import { FC } from "react"
import * as cls from "./Input.module.scss"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string
}

export const Input: FC<InputProps> = (props) => {
    const {
        className,
        onChange,
        value,
        ...otherProps
    } = props

    return (
        <input onChange={onChange} value={value} {...otherProps} className={classNames(cls.Input, className)} />
    )
}
