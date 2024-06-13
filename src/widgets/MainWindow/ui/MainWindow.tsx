import classNames from "classnames"
import { useEffect, useState } from "react"
import { Message } from "shared/ui/Message/Message"
import * as cls from "./MainWindow.module.scss"

interface MainWindowProps {
    className?: string
}

export const MainWindow = ({ className }: MainWindowProps) => {
    const [showAiAnswer, setShowAiAnswer] = useState(false)
    useEffect(() => {
        setTimeout(() => setShowAiAnswer(true), 2000)
    }, [])
    return (
        <div className={classNames(cls.MainWindow, {}, [className])}>
            <h1 className={cls.title}>Добро пожаловать в <span>Papper</span></h1>
            <h2 className={cls.description}>Чат-бот по работе с документацией</h2>
            <div className={cls.preview}>
                <Message sender={"user"} content={"Привет, как тебя зовут?"} isExample />
                { showAiAnswer && <Message sender={"ai"} content={"Привет, меня зовут Papper"} isExample/>}
            </div>
            {/* <div className={cls.stats}>
                <Statistic className={cls.stat} title="Всего хранилищ" value={vaultsPreview.length} formatter={statsFormatter}/>
                <Statistic className={cls.stat} title="Всего чатов" value={chatsPreview.length} formatter={statsFormatter} />
            </div> */}
        </div>
    )
}
