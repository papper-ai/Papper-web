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
import { message, type UploadProps } from "antd"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { vaultsActions, VaultSchema } from "entities/Vault"

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
    const dispatch = useAppDispatch()
    const [newVaultType, setNewVaultType] = useState("graph")
    const [files, setFiles] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const handleChangeNewVaultName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVaultName(e.target.value)
    }
    const handleChangeSelect = (value: string) => {
        setNewVaultType(value)
    }

    const handleSubmitNewVault = async () => {
        messageApi.open({
            type: "loading",
            content: "Идет создание хранилища...",
            duration: 0
        })
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
            const result = await $api.post<VaultSchema>("/vault/create_vault", formData, { headers: { "Content-Type": "multipart/form-data" } })
            messageApi.destroy()
            console.log(result)
            if (result) {
                messageApi.open({
                    type: "success",
                    content: "Хранилище создано",
                    duration: 0
                })
                dispatch(vaultsActions.pushVaults(result.data))
                onClose()
            } else {
                throw new Error()
            }
        } catch (e) {
            messageApi.open({
                type: "error",
                content: "Не удалось создать хранилище",
                duration: 0
            })
        } finally {
            setTimeout(() => {
                messageApi.destroy()
            }, 1500)
        }
    }
    const handleChangeUploader: UploadFunction = (options) => {
        const file = options.file
        console.log(file)
        setFiles([...files, file])
        options.onSuccess("file uploaded")
    }
    return (
        <>
            {contextHolder}
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
        </>

    )
}
