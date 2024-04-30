import classNames from "classnames"
import { FC } from "react"
import * as cls from "./Text.module.scss"

export enum TextTheme {
    VAULT = "vault",
    ERROR = "error",
    INLINE = "inline"
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    textTheme?: TextTheme
}

export const Text: FC<TextProps> = (props: TextProps) => {
    const {
        className,
        title,
        text,
        textTheme = TextTheme.VAULT
    } = props

    return (
        <div className={classNames(cls.Text, {}, [className, cls[textTheme]])}>
            <div className={classNames(cls.title)}>{title}</div>
            <div className={classNames(cls.text)}>{text}</div>
        </div>
    )
}
