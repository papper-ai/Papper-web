import classNames from "classnames"
import "./TogglePanel.scss"
import { FC, memo } from "react"
import { Button } from "shared/ui/Button/Button"

interface TogglePanelProps {
  className?: string;
  title: string;
  description: string;
  buttonName: string;
  onClick: () => void;
}

export const TogglePanel: FC<TogglePanelProps> = memo(function TogglePanel (props: TogglePanelProps) {
    const {
        className,
        title,
        description,
        buttonName,
        onClick
    } = props

    console.log("Component is rendered")

    return (
        <div className={classNames("togglePanel", {}, [className])}>
            <h1 className="togglePanel__title">{title}</h1>
            <p className="togglePanel__description">{description}</p>
            <Button onClick={onClick} className="hidden">{buttonName}</Button>
        </div>
    )
})
