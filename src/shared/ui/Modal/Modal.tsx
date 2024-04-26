import classNames from "classnames"
import * as cls from "./Modal.module.scss"
import { useEffect, useRef, useState } from "react"

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const {
        children,
        className,
        isOpen,
        onClose
    } = props

    const [closing, setClosing] = useState(false)
    const timerRef = useRef<ReturnType <typeof setTimeout>>()
    const handleClick = () => {
        setClosing(true)
        timerRef.current = setTimeout(() => {
            setClosing(false)
            onClose()
        }, 300)
    }
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])
    const mods = {
        [cls.open]: isOpen,
        [cls.closing]: closing
    }

    return (
        <div className={classNames(cls.Modal, mods, [className])}>
            <div onClick={handleClick} className={cls.overlay}>
                <div onClick={(e) => e.stopPropagation()} className={cls.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
