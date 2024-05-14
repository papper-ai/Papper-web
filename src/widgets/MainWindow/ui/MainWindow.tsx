import { Statistic } from "antd"
import classNames from "classnames"
import { Text } from "shared/ui/Text/Text"
import * as cls from "./MainWindow.module.scss"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getVaults } from "entities/Vault"
import { getChatsPreview } from "entities/Chat"

interface MainWindowProps {
    className?: string
}

export const MainWindow = ({ className }: MainWindowProps) => {
    const vaultsPreview = useSelector(getVaults)
    const chatsPreview = useSelector(getChatsPreview)
    

    return (
        <div className={classNames(cls.MainWindow, {}, [className])}>
            <Text title="Добро пожаловать в Papper" text="Чат-бот по работе с документацией" />
            <div className={cls.stats}>
                <Statistic title="Всего документов" value={vaultsPreview.length} />
                <Statistic title="Всего чатов" value={chatsPreview.length} />
            </div>
        </div>
    )
}
