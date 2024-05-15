import { Statistic } from "antd"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { getChatsPreview } from "entities/Chat"
import { getVaults } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { statsFormatter } from "shared/lib/statsFormatter"
import { Text } from "shared/ui/Text/Text"
import * as cls from "./MainWindow.module.scss"

interface MainWindowProps {
    className?: string
}

export const MainWindow = ({ className }: MainWindowProps) => {
    const vaultsPreview = useSelector(getVaults)
    const chatsPreview = useSelector(getChatsPreview)

    return (
        <div className={classNames(cls.MainWindow, {}, [className])}>
            <h1 className={cls.title}>Добро пожаловать в <span>Papper</span></h1>
            <h2 className={cls.description}>Чат-бот по работе с документацией</h2>
            <div className={cls.stats}>
                <Statistic className={cls.stat} title="Всего документов" value={vaultsPreview.length} formatter={statsFormatter}/>
                <Statistic className={cls.stat} title="Всего чатов" value={chatsPreview.length} formatter={statsFormatter} />
            </div>
        </div>
    )
}
