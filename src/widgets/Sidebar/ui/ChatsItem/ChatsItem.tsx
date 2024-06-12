import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Input, Button } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import classNames from "classnames"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { chatsActions } from "entities/Chat"
import { $api } from "shared/api/api"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import * as cls from "./ChatsItem.module.scss"

interface ChatsItemProps {
    label: string
    id: string
    messageApi?: MessageInstance
}

export const ChatsItem = ({ label, id, messageApi }: ChatsItemProps) => {
    const dispatch = useAppDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const deleteChat = async () => {
        try {
            const result = await $api.delete(`/messaging/delete_chat/${id}`)
            if (result) {
                messageApi?.open({
                    type: "success",
                    content: "Чат удален",
                    duration: 2
                })
                dispatch(chatsActions.deleteChat(id))
                navigate(RoutePath[AppRoutes.MAIN])
            } else {
                throw new Error()
            }
        } catch (e) {
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при удалении чата",
                duration: 2
            })
        }
    }

    const renameChat = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        try {
            const result = await $api.patch("/messaging/rename_chat", { chat_id: id, name: value })
            if (result) {
                messageApi?.open({
                    type: "success",
                    content: "Чат переименован",
                    duration: 2
                })
                dispatch(chatsActions.renameChat({ id, name: value }))
            } else {
                throw new Error()
            }
            setIsEdit(false)
        } catch (e) {
            messageApi?.open({
                type: "error",
                content: "Произошла ошибка при переименовании чата",
                duration: 2
            })
        }
    }
    return (
        <div className={classNames(cls.ChatsItem, {}, [])}>
            {isEdit ? <Input onKeyDown={(e) => { if (e.key === "Enter") { renameChat(e) } }} onClick={(е) => { е.stopPropagation() }} defaultValue={label} onBlur={() => setIsEdit(false)} /> : <div className={cls.label}>{label}</div>}
            <div className={cls.actions}>
                <Button size="small" type="text" onClick={(е) => { е.stopPropagation(); deleteChat() }} icon={<DeleteOutlined style={{ color: "red" }} />} />
                <Button size="small" type="text" onClick={(e) => { e.stopPropagation(); setIsEdit(!isEdit) }} icon={<EditOutlined />} />
            </div>
        </div>
    )
}
