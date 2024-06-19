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
import { UploadChangeParam } from "antd/es/upload"

interface NewVaultCreaterProps {
    className?: string;
    onClose?: () => void
    isOpen: boolean
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
    const [newVaultType, setNewVaultType] = useState("vector")
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
                if (!files[i].originFileObj) continue
                formData.append("files", files[i].originFileObj as string | Blob)
            }
            const result = await $api.post<VaultSchema>("/vault", formData, { headers: { "Content-Type": "multipart/form-data" } })
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
    const handleChangeUploader: UploadProps["onChange"] = useCallback((info: UploadChangeParam<UploadFile<any>>) => {
        let newFileList = [...info.fileList]
        newFileList = newFileList.slice(-5)
        newFileList = newFileList.filter((file) => {
            if (!file.size) return false
            if (file.size > 10 * 1024 * 1024) {
                messageApi.open({
                    type: "error",
                    content: "Файл должен быть меньше 10 МБ",
                    duration: 2
                })
                return false
            }
            return true
        })
        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url
            }
            return file
        })

        setFiles(newFileList)
    }, [])

    const dummyRequest: UploadFunction = ({ onSuccess }) => {
        onSuccess?.("ok")
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
