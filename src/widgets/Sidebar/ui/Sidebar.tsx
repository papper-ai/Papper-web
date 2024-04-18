import classNames from 'classnames'
import * as cls from './Sidebar.module.scss'
import { Logo } from 'shared/ui/Logo/Logo'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { List } from 'shared/ui/List/List'
import { useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [newChatModal, setNewChatModal] = useState(false)

  const handleNewChat = () => {
    setNewChatModal(true)
  }
  const i = 0

  return (
        <div className={classNames(cls.Sidebar, {}, [className])}>
            <Logo/>
            <Button onClick={handleNewChat} theme={ThemeButton.SECONDARY} className={'newChatBtn'}>Создать новый чат</Button>
            <List/>
            <Modal onClose={() => setNewChatModal(false)} isOpen={newChatModal}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque minima, optio ipsam nisi dolore necessitatibus sequi labore, aut temporibus quaerat reprehenderit eaque tempore fuga obcaecati consequuntur cum sunt libero atque!</Modal>
        </div>
  )
}
