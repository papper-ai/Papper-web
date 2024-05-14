import TextArea, { TextAreaProps } from "antd/es/input/TextArea"
import classNames from "classnames"
import { memo } from "react"
import * as cls from "./TextField.module.scss"

interface TextFieldProps extends TextAreaProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

export const TextField = memo(({ className, onChange, value, ...props }: TextFieldProps) => {
    return (
        <TextArea value={value} {...props} onChange={onChange} autoSize={{ minRows: 3, maxRows: 7 }} className={classNames(cls.TextField, {}, [className])}/>
    )
})
