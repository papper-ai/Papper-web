import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import classNames from "classnames"
import { memo, useCallback, useState } from "react"
import { vaultsActions } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./VaultExtra.module.scss"
import { fetchChatsPreview } from "entities/Chat"

interface VaultExtraProps {
    className?: string;
    id?: string;
    messageApi?: MessageInstance
}

export const VaultExtra = memo(({ className, id, messageApi }: VaultExtraProps) => {
    const dispatch = useAppDispatch()
    const [renameOpen, setRenameOpen] = useState(false)
    const [newName, setNewName] = useState("")
    const deleteVault = useCallback(async (id: string) => {
        try {
            const result = await $api.delete(`/vault/delete_vault/${id}`)
            if (result) {
                messageApi.open({
                    type: "success",
                    content: "Хранилище удалено",
                    duration: 2
                })
                dispatch(vaultsActions.deleteVault(id))
                dispatch(fetchChatsPreview({}))
            } else {
                throw new Error()
            }
        } catch (e) {
            messageApi.open({
                type: "error",
                content: "Произошла ошибка при удалении хранилища",
                duration: 2
            })
        }
    }, [dispatch, messageApi])

    const renameVault = useCallback(async (id: string) => {
        try {
            const result = await $api.patch("/vault/update_vault_name", { vault_id: id, name: newName })
            if (result) {
                messageApi.open({
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
            messageApi.open({
                type: "error",
                content: "Произошла ошибка при переименовании хранилища",
                duration: 2
            })
        }
    }, [dispatch, messageApi, newName])
    return (
        <div className={classNames(cls.VaultExtra, {}, [className])}>
            {renameOpen && <Input value={newName} onClick={(e) => { e.stopPropagation() }} onChange={(e) => { setNewName(e.target.value) }} style={{ width: "200px" }} placeholder="Новое имя хранилища" onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter") { renameVault(id) } }} />}
            <Button type="text" icon={<DeleteOutlined style={{ color: "red", fontSize: "20px" }} />} onClick={(e) => { e.stopPropagation(); deleteVault(id) }} />
            <Button type="text" icon={<EditOutlined style={{ color: "primary", fontSize: "20px" }} />} onClick={(e) => { e.stopPropagation(); setRenameOpen(!renameOpen) }} />
        </div>
    )
})
