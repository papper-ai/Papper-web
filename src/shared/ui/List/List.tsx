import classNames from "classnames"
import { Button, ThemeButton } from "../Button/Button"
import * as cls from "./List.module.scss"

interface ListProps {
    className?: string
    items?: string[]
}

export const List = ({ className, items }: ListProps) => {
    return (
        <ul className={cls.List}>
            {items?.map((item) => (
                <li className={cls.item} key={item}>
                    <Button theme={ThemeButton.LIST}>{item}</Button>
                </li>
            ))}
        </ul>
    )
}
