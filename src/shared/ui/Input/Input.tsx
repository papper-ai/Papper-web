import { Input, InputProps } from "antd"
import classNames from "classnames"
import { FC, memo } from "react"
import * as cls from "./Input.module.scss"

export interface FormInputProps extends InputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    isPassword?: boolean;
}

const style = {
    fontSize: "16px"
}

export const FormInput = memo((props: FormInputProps) => {
    const {
        className,
        onChange,
        value,
        isPassword = false,
        ...otherProps
    } = props

    return (
        (isPassword
            ? <Input.Password style={style} onChange={onChange} value={value} {...otherProps} className={classNames(cls.Input, className)} />
            : <Input onChange={onChange} value={value} {...otherProps} className={classNames(cls.Input, className)} />
        )
    )
})
