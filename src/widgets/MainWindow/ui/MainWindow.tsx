import { useGSAP } from "@gsap/react"
import classNames from "classnames"
import { gsap } from "gsap"
import TextPlugin from "gsap/TextPlugin"
import { useEffect, useRef, useState } from "react"
import { Message } from "shared/ui/Message/Message"
import * as cls from "./MainWindow.module.scss"
gsap.registerPlugin(useGSAP)
interface MainWindowProps {
    className?: string
}

export const MainWindow = ({ className }: MainWindowProps) => {
    const [showAiAnswer, setShowAiAnswer] = useState(false)
    const tl = useRef(null)
    useGSAP(() => {
        tl.current = gsap.timeline()
            .from("." + cls.title, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power4.out"
            })
            .from("." + cls.description, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: "power4.out"
            })
    })
    useEffect(() => {
        setTimeout(() => setShowAiAnswer(true), 2000)
    }, [])
    return (
        <div className={classNames(cls.MainWindow, {}, [className])}>
            <h1 className={cls.title}>Добро пожаловать в <span>Papper</span></h1>
            <h2 className={cls.description}>Чат-бот по работе с документацией</h2>
            <div className={cls.preview}>
                <Message sender={"user"} content={"Привет, как тебя зовут?"} isExample />
                {showAiAnswer && <Message sender={"ai"} content={"Привет, меня зовут Papper"} isExample />}
            </div>
            {/* <div className={cls.stats}>
                <Statistic className={cls.stat} title="Всего хранилищ" value={vaultsPreview.length} formatter={statsFormatter}/>
                <Statistic className={cls.stat} title="Всего чатов" value={chatsPreview.length} formatter={statsFormatter} />
            </div> */}
        </div>
    )
}
