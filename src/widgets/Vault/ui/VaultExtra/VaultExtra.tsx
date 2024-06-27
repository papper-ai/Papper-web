import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import { memo, useCallback, useState } from "react"
import { chatsApi } from "entities/Chat"
import { vaultsActions } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./VaultExtra.module.scss"
interface VaultExtraProps {
    className?: string;
    id?: string;
    messageApi?: MessageInstance
}

export const VaultExtra = memo(({ id, messageApi }: VaultExtraProps) => {
    const dispatch = useAppDispatch()
    const [renameOpen, setRenameOpen] = useState(false)
    const [newName, setNewName] = useState("")
    const { refetch } = chatsApi.useGetChatsPreviewQuery()
    const deleteVault = useCallback(async (id: string) => {
        try {
            const result = await $api.delete(`/vault/${id}`)
            if (result) {
                messageApi?.open({
                    type: "success",
                    content: "Хранилище удалено",
                    duration: 2
                })
                dispatch(vaultsActions.deleteVault(id))
                refetch()
            } else {
                throw new Error()
            }
        } catch (e) {
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при удалении хранилища",
                duration: 2
            })
        }
    }, [dispatch, messageApi, refetch])

    const renameVault = useCallback(async (id: string) => {
        try {
            const result = await $api.patch("/vault/name", { vault_id: id, name: newName })
            if (result) {
                messageApi?.open({
                    type: "success",
                    content: "Хранилище переименовано",
                    duration: 2
                })
                dispatch(vaultsActions.renameVault({ id, name: newName }))
            } else {
                throw new Error()
            }
            setRenameOpen(false)
        } catch (e) {
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при переименовании хранилища",
                duration: 2
            })
        }
    }, [dispatch, messageApi, newName])
    return (
        <>
            {renameOpen && <Input value={newName} onClick={(e) => { e.stopPropagation() }} onChange={(e) => { setNewName(e.target.value) }} className={cls.input} placeholder="Новое имя хранилища" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { renameVault(id) } }} />}
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Button type="text" icon={<DeleteOutlined style={{ color: "red", fontSize: "20px" }} />} onClick={(e) => { e.stopPropagation(); if (id) deleteVault(id) }} />
                <Button type="text" icon={<EditOutlined style={{ color: "primary", fontSize: "20px" }} />} onClick={(e) => { e.stopPropagation(); setRenameOpen(!renameOpen) }} />
            </div>
        </>
    )
})
