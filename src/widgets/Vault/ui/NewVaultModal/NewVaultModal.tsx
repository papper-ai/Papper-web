/* eslint-disable import/order */
import classNames from "classnames"
import * as cls from "./NewVaultModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { Uploader } from "shared/ui/Uploader/Uploader"
import { Selecter } from "shared/ui/Select/Selecter"
import { Text } from "shared/ui/Text/Text"
import { FormInput } from "shared/ui/Input/Input"
import { useRef, useState } from "react"
import { $api } from "shared/api/api"
import type { UploadProps } from "antd"

interface NewVaultCreaterProps {
    className?: string;
    onClose?: () => void
    isOpen?: boolean
}

type UploadFunction = UploadProps["customRequest"]
export const NewVaultModal = (props: NewVaultCreaterProps) => {
    const {
        className,
        onClose,
        isOpen
    } = props
    const [newVaultName, setNewVaultName] = useState("")
    const [newVaultType, setNewVaultType] = useState("graph")
    const [files, setFiles] = useState([])
    const handleChangeNewVaultName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVaultName(e.target.value)
    }
    const handleChangeSelect = (value: string) => {
        setNewVaultType(value)
    }

    const handleSubmitNewVault = () => {
        try {
            const vaultConfig = {
                vault_name: newVaultName,
                vault_type: newVaultType
            }
            const formData = new FormData()
            formData.append("create_vault_credentials", JSON.stringify(vaultConfig))
            for (let i = 0; i < files?.length; i++) {
                formData.append("files", files[i])
            }
            $api.post("/vault/create_vault", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                console.log(res)
            })
        } catch (e) {
            console.log(e)
        }
    }
    const handleChangeUploader: UploadFunction = (options) => {
        const file = options.file
        console.log(file)
        setFiles([...files, file])
        options.onSuccess("file uploaded")
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.modalContainer}>
                <Text className={cls.title} title="Добавление нового хранилища" />
                <FormInput value={newVaultName} onChange={handleChangeNewVaultName} placeholder="Название" />
                <Selecter value={newVaultType} onChange={handleChangeSelect} label="Выберите тип хранилища" />
                {/* <input ref={filesRef} type="file" multiple accept="application/pdf, application/msword, text/plain" /> */}
                <Uploader
                    name="file"
                    multiple={true}
                    maxCount={5}
                    accept="application/pdf, application/msword, text/plain"
                    customRequest={handleChangeUploader}
                />
                <Button className={cls.btn} onClick={handleSubmitNewVault} theme={ThemeButton.PRIMARY}>Добавить</Button>
            </div>
        </Modal>
    )
}
