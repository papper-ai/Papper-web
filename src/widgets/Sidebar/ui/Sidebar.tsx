import classNames  from 'classnames';
import * as cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({className}: SidebarProps) => {
    return (
        <div className={classNames(cls.Sidebar, {}, [className])}>

        </div>
    );
}

