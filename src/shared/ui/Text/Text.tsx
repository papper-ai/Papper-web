import classNames from "classnames"
import { FC, memo } from "react"
import * as cls from "./Text.module.scss"

export enum TextTheme {
    VAULT = "vault",
    ERROR = "error",
    INLINE = "inline",
    TRACEBACK = "traceback"
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    textTheme?: TextTheme
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        textTheme = TextTheme.VAULT
    } = props

    return (
        <div className={classNames(cls.Text, {}, [className, cls[textTheme]])}>
            {title && <div className={classNames(cls.title)}>{title}</div>}
            {text && <div className={classNames(cls.text)}>{text}</div>}
        </div>
    )
})
