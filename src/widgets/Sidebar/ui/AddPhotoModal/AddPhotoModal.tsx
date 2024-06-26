import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Modal } from "shared/ui/Modal/Modal"
import { Text, TextTheme } from "shared/ui/Text/Text"
import * as cls from "./AddPhoto.module.scss"

interface AddPhotoProps {
    className?: string
    isOpen: boolean
    onClose?: () => void
}

export const AddPhoto = ({ isOpen, onClose }: AddPhotoProps) => {
    const cameraRef = useRef(null)
    const [cameraError, setCameraError] = useState(false)
    useEffect(() => {
        const checkCamera = async () => {
            if (isOpen) {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.log("Camera error")
                    setCameraError(true)
                    return
                }
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices()
                    const hasWebcam = devices.some(device => device.kind === "videoinput")
                    if (hasWebcam) {
                        console.log("Веб-камера доступна.")
                        setCameraError(false)
                    } else {
                        console.log("Веб-камера не найдена.")
                        setCameraError(true)
                    }
                } catch (err) {
                    console.error("Ошибка при доступе к устройствам: ", err)
                    setCameraError(true)
                }
            }
        }

        checkCamera()
    }, [isOpen])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.Photo}>
                {
                    cameraError
                        ? <Text title="Ошибка доступа к камере" textTheme={TextTheme.ERROR} />
                        : (<div className={cls.Webcam}>
                            {(isOpen && !cameraError) && <Webcam ref={cameraRef} width={640} height={640} />}
                        </div>)
                }

            </div>
        </Modal>
    )
}
