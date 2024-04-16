import classNames  from 'classnames';
import * as cls from './Sidebar.module.scss';
import { Logo } from 'shared/ui/Logo/Logo';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({className}: SidebarProps) => {
    return (
        <div className={classNames(cls.Sidebar, {}, [className])}>
            <Logo/>
            <Button theme={ThemeButton.SECONDARY} className={"newChatBtn"}>Создать новый</Button>
        </div>
    );
}

