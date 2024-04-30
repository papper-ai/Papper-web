import classNames from "classnames"
import { Button, ThemeButton } from "../Button/Button"
import * as cls from "./List.module.scss"

interface ListProps {
    className?: string
}

export const List = ({ className }: ListProps) => {
    return (
        <ul className={cls.List}>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.LIST} className={"newChatBtn"}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.LIST} className={"newChatBtn"}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.LIST} className={"newChatBtn"}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.LIST} className={"newChatBtn"}>Чат</Button>
            </li>
        </ul>
    )
}
