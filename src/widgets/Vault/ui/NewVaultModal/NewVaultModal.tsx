/* eslint-disable import/order */
import classNames from "classnames"
import * as cls from "./NewVaultModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal"
import { Button, Form, Input, Select, Upload } from "antd"

import { Text } from "shared/ui/Text/Text"
import { FormInput } from "shared/ui/Input/Input"
import { useCallback, useRef, useState } from "react"
import { $api } from "shared/api/api"
import { message, UploadFile, type UploadProps } from "antd"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { vaultsActions, VaultSchema } from "entities/Vault"
import { UploadChangeParam } from "antd/es/upload"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload
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
                setFiles([])
                setNewVaultName("")
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
                    <Form
                        layout="vertical"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        onFinish={handleSubmitNewVault}
                        requiredMark={false}
                    >
                        <Form.Item
                            name="name"
                            label="Название хранилища"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "Название хранилища обязательно", whitespace: true }]}
                            hasFeedback
                        >
                            <FormInput style={{ marginTop: "0" }} autoComplete="off" disabled={uploading} value={newVaultName} onChange={handleChangeNewVaultName} placeholder="Название" />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Тип хранилища"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "Тип хранилища обязателен" }]}
                            hasFeedback
                        >
                            <Select
                                value={newVaultType}
                                style={{ width: "100%", height: "50px" }}
                                onChange={handleChangeSelect}
                                options={[
                                    { value: "graph", label: "Граф знаний" },
                                    { value: "vector", label: "Векторная база данных" }
                                ]}
                            />

                        </Form.Item>
                        <Form.Item
                            name="files"
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: "Файлы обязательны" }]}
                        >
                            <div style={{ height: "200px", width: "100%", marginTop: "20px" }}>
                                <Dragger
                                    style={{ width: "100%" }}
                                    maxCount={5} multiple={true}
                                    fileList={files}
                                    onChange={handleChangeUploader}
                                    customRequest={dummyRequest}
                                    accept={".pdf, .md, .docx, .txt"}
                                    onRemove={(e) => {
                                        setFiles(files.filter((item) => item.uid !== e.uid))
                                    }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Кликните или перетащите для загрузки ваш файл</p>
                                    <p className="ant-upload-hint">
                                        Поддерживаемые форматы: .pdf, .md, .docx, .txt
                                    </p>
                                </Dragger>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={uploading} type="primary" className={cls.btn}>Добавить</Button>
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        </>

    )
}
