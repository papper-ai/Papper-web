import { Spin } from "antd"
import classNames from "classnames"
import { memo } from "react"
import * as cls from "./Loader.module.scss"
interface LoaderProps {
    className?: string
    size?: "small" | "large"
}

export const Loader = memo(({ className, size }: LoaderProps) => {
    return (
        <div className={classNames(cls.Loader, {}, [className])}>
            <Spin size={size} />
        </div>
    )
})
