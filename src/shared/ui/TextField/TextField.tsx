import TextArea from "antd/es/input/TextArea"
import classNames from "classnames"
import { memo } from "react"
import * as cls from "./TextField.module.scss"

interface TextFieldProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string
}

export const TextField = memo(({ className, onChange, value }: TextFieldProps) => {
    return (
        <TextArea value={value} onChange={onChange} autoSize={{ minRows: 3, maxRows: 7 }} className={classNames(cls.TextField, {}, [className])}/>
    )
})
