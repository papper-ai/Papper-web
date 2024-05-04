import { Input, InputProps } from "antd"
import classNames from "classnames"
import { FC } from "react"
import * as cls from "./Input.module.scss"

export interface FormInputProps extends InputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string
}

export const FormInput: FC<FormInputProps> = (props) => {
    const {
        className,
        onChange,
        value,
        ...otherProps
    } = props

    return (
        <Input onChange={onChange} value={value} {...otherProps} className={classNames(cls.Input, className)} />
    )
}
