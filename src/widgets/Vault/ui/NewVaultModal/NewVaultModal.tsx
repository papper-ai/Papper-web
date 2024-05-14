/* eslint-disable import/order */
import classNames from "classnames"
import * as cls from "./NewVaultModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal"
import { Button } from "antd"
import { Uploader } from "shared/ui/Uploader/Uploader"
import { Selecter } from "shared/ui/Select/Selecter"
import { Text } from "shared/ui/Text/Text"
import { FormInput } from "shared/ui/Input/Input"
import { useCallback, useRef, useState } from "react"
import { $api } from "shared/api/api"
import { message, UploadFile, type UploadProps } from "antd"
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
    const [files, setFiles] = useState<UploadFile[]>([])
    const [messageApi, contextHolder] = message.useMessage()
    const [uploading, setUploading] = useState(false)
    const handleChangeNewVaultName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVaultName(e.target.value)
    }
    const handleChangeSelect = (value: string) => {
        setNewVaultType(value)
    }
    const closeModal = () => {
        setNewVaultName("")
        setNewVaultType("graph")
        setFiles([])
        onClose?.()
    }
    const handleSubmitNewVault = async () => {
        messageApi.open({
            type: "loading",
            content: "Идет создание хранилища...",
            duration: 0
        })
        setUploading(true)
        try {
            const vaultConfig = {
                vault_name: newVaultName,
                vault_type: newVaultType
            }
            const formData = new FormData()
            formData.append("create_vault_credentials", JSON.stringify(vaultConfig))
            for (let i = 0; i < files?.length; i++) {
                formData.append("files", files[i].originFileObj)
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
                closeModal()
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
            setUploading(false)
            setTimeout(() => {
                messageApi.destroy()
            }, 1500)
        }
    }
    const handleChangeUploader: UploadProps["onChange"] = useCallback((info) => {
        let newFileList = [...info.fileList]

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-5)

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url
            }
            return file
        })

        setFiles(newFileList)
    }, [])

    const dummyRequest: UploadFunction = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok")
        }, 0)
    }

    return (
        <>
            {contextHolder}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className={cls.modalContainer}>
                    <Text className={cls.title} title="Добавление нового хранилища" />
                    <FormInput disabled={uploading} value={newVaultName} onChange={handleChangeNewVaultName} placeholder="Название" />
                    <Selecter value={newVaultType} onChange={handleChangeSelect} label="Выберите тип хранилища" />
                    <Uploader
                        disabled={uploading}
                        name="file"
                        maxCount={5}
                        fileList={files}
                        multiple
                        onRemove={(e) => {
                            setFiles(files.filter((item) => item.uid !== e.uid))
                        }}
                        accept=".pdf,.docx,.txt,.md"
                        onChange={handleChangeUploader}
                        customRequest={dummyRequest}
                    />
                    <Button disabled={uploading} className={cls.btn} onClick={handleSubmitNewVault} loading={uploading}>Добавить</Button>
                </div>
            </Modal>
        </>

    )
}
