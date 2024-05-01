import TextArea from "antd/es/input/TextArea"
import classNames from "classnames"
import * as cls from "./TextField.module.scss"

interface TextFieldProps {
    className?: string;
}

export const TextField = ({ className }: TextFieldProps) => {
    return (
        <TextArea autoSize={{ minRows: 3, maxRows: 7 }} className={classNames(cls.TextField, {}, [className])}/>
    )
}
