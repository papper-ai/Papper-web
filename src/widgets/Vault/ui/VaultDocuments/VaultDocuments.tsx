import { DeleteOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Empty, Skeleton, Upload, UploadProps } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import { memo } from "react"
import Markdown from "react-markdown"
import { TypeAnimation } from "react-type-animation"
import { IDocument, vaultsActions, VaultSchema } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Acordion } from "shared/ui/Collapse/Collapse"
import { TextTheme, Text } from "shared/ui/Text/Text"
import { VaultDocumentsExtra } from "../VaultDocumentsExtra/VaultDocumentsExtra"
import * as cls from "./VaultDocuments.module.scss"
interface VaultDocumentsProps {
    items?: IDocument[];
    vaultId?: string;
    messageApi?: MessageInstance
}
type UploadFunction = UploadProps["customRequest"]
export const VaultDocuments = memo(({ items, vaultId, messageApi }: VaultDocumentsProps) => {
    const dispatch = useAppDispatch()
    console.log(items)
    const deleteDocument = async (id: string) => {
        try {
            const result = await $api.delete(`/vault/${vaultId}/document/${id}`)
            if (result) {
                messageApi?.open({
                    type: "success",
                    content: "Документ удален",
                    duration: 2
                })
                dispatch(vaultsActions.deleteDocument({ vaultId, id }))
            } else {
                throw new Error()
            }
        } catch (e) {
            console.log(e)
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при удалении документа",
                duration: 2
            })
        }
    }
    const uploadNewDocument: UploadFunction = async (options) => {
        const formData = new FormData()
        if (!vaultId) return
        formData.append("vault_id", vaultId)
        formData.append("file", options.file)
        messageApi?.open({
            type: "loading",
            content: "Идет загрузка документа...",
            duration: 0
        })
        try {
            const result = await $api.patch<VaultSchema>("/vault/document", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            messageApi?.destroy()
            if (result?.data) {
                console.log(result)
                messageApi?.open({
                    type: "success",
                    content: "Документ добавлен",
                    duration: 2
                })
                options.onSuccess?.(result)
                dispatch(vaultsActions.addDocument({ vaultId, documents: result.data.documents }))
            } else {
                throw new Error()
            }
        } catch (e) {
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при добавлении документа",
                duration: 2
            })
            options?.onError?.(e as Error)
        }
    }
    return (
        <>
            <div className={cls.Documents}>
                <Upload
                    maxCount={1}
                    accept="application/pdf, application/msword, text/plain"
                    showUploadList={false}
                    customRequest={uploadNewDocument}
                >
                    <Button size="large" icon={<UploadOutlined />}>Добавить новый документ</Button>
                </Upload>
            </div>
            { (items?.length ?? 0) > 0
                ? <Acordion
                    items=
                        {items?.map((doc: IDocument) => {
                            return {
                                key: doc.id,
                                label: <Text key={doc.id} title={doc.name} textTheme={TextTheme.INLINE} />,
                                children: <Markdown className={cls.markdown} key={doc.id} >{doc.text}</Markdown>,
                                extra: <VaultDocumentsExtra deleteDocument={deleteDocument} doc={doc}/>
                            }
                        })} />
                : items === undefined ? <Skeleton active paragraph={{ rows: 5 }} /> : <Empty description="Документы отсутствуют" />}
        </>

    )
})
