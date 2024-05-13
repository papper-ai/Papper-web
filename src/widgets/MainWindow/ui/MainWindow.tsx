import { Statistic } from "antd"
import classNames from "classnames"
import { Text } from "shared/ui/Text/Text"
import * as cls from "./MainWindow.module.scss"
interface MainWindowProps {
    className?: string
}

export const MainWindow = ({ className }: MainWindowProps) => {
    return (
        <div className={classNames(cls.MainWindow, {}, [className])}>
            <Text title="Добро пожаловать в Papper" text="Чат-бот по работе с документацией" />
            <div className={cls.stats}>
                <Statistic title="Всего документов" value={10} />
                <Statistic title="Всего чатов" value={10} />
            </div>
        </div>
    )
}
