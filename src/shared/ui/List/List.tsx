import classNames from 'classnames'
import * as cls from './List.module.scss'
import { Button, ThemeButton } from '../Button/Button'

interface ListProps {
    className?: string
}

export const List = ({ className }: ListProps) => {
  return (
        <ul className={cls.List}>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.SECONDARY} className={'newChatBtn'}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.SECONDARY} className={'newChatBtn'}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.SECONDARY} className={'newChatBtn'}>Чат</Button>
            </li>
            <li className={cls.listItem}>
                <Button theme={ThemeButton.SECONDARY} className={'newChatBtn'}>Чат</Button>
            </li>
        </ul>
  )
}
