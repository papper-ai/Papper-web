import classNames from "classnames"
import * as cls from "./EmptyChat.module.scss"

interface EmptyChatProps {
    className?: string
}

export const EmptyChat = ({ className }: EmptyChatProps) => {
    return (
        <div className={classNames(cls.EmptyChat, {}, [className])}>
            <div className={cls.text}>С чего бы начать?</div>
            <div className={cls.description}>Задайте любой вопрос и наш ИИ ответит на него...</div>
        </div>
    )
}
