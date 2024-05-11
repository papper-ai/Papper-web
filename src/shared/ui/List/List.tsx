import classNames from "classnames"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { Button, ThemeButton } from "../Button/Button"
import * as cls from "./List.module.scss"

interface ListItem {
    title: string
    element_id: string
}

interface ListProps {
    className?: string
    items?: ListItem[]
}

export const List = memo(({ className, items }: ListProps) => {
    const navigate = useNavigate()
    
    return (
        <ul className={cls.List}>
            {items?.map((item) => (
                <li className={cls.item} key={item.element_id}>
                    <Button onClick={() => navigate(RoutePath[AppRoutes.MAIN] + "/" + item.element_id)} theme={ThemeButton.LIST}>{item.title}</Button>
                </li>
            ))}
        </ul>
    )
})
