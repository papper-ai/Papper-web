import classNames  from 'classnames';
import './TogglePanel.scss';
import { Button } from 'shared/ui/Button/Button';
import { FC } from 'react';

interface TogglePanelProps {
    className?: string;
    title: string;
    description: string;
    buttonName: string;
    onClick: () => void;
}

export const TogglePanel: FC<TogglePanelProps> = (props: TogglePanelProps) => {
    const {
        className,
        title,
        description,
        buttonName,
        onClick
    } = props


    return (
        <div className={classNames("togglePanel", {}, [className])}>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button onClick={onClick} className="hidden">{buttonName}</Button>
        </div>
    );
}

