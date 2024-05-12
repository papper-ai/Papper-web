import { DeleteOutlined } from "@ant-design/icons"
import { Button, Skeleton, Upload } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import { memo } from "react"
import Markdown from "react-markdown"
import { IDocument, vaultsActions } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Acordion } from "shared/ui/Collapse/Collapse"
import { TextTheme, Text } from "shared/ui/Text/Text"
import * as cls from "./VaultDocuments.module.scss"
interface VaultDocumentsProps {
    items?: IDocument[];
    vaultId?: string;
    messageApi?: MessageInstance
}

export const VaultDocuments = memo(({ items, vaultId, messageApi }: VaultDocumentsProps) => {
    const dispatch = useAppDispatch()
    const deleteDocument = async (id: string) => {
        try {
            const result = await $api.delete(`/vault/delete_document/${vaultId}/${id}`)
            if (result) {
                messageApi.open({
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
            messageApi.open({
                type: "error",
                content: "Произошла ошибка при удалении документа",
                duration: 2
            })
        }
    }
    return (
        <>
            <div className={cls.Documents}>
                <Upload />
            </div>
            {items?.length > 0
                ? <Acordion
                    items=
                        {items.map((doc: IDocument) => {
                            return {
                                key: doc.id,
                                label: <Text key={doc.id} title={doc.name} textTheme={TextTheme.INLINE} />,
                                children: <Markdown>{doc.text}</Markdown>,
                                extra: <Button type="text" shape="circle" style={{ color: "red", fontSize: "20px" }} icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); deleteDocument(doc.id) }} />
                            }
                        })} />
                : <Skeleton active paragraph={{ rows: 5 }} />}
        </>

    )
})
