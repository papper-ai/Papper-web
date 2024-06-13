import classNames from "classnames"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { chatsApi } from "entities/Chat"
import { getVaults } from "entities/Vault"
import * as cls from "./ChatInfo.module.scss"

export const ChatInfo = () => {
    const { id } = useParams()
    const { currentChat } = chatsApi.useGetChatsPreviewQuery(undefined, {
        selectFromResult: ({ data }) => ({
            currentChat: data?.find(chat => chat?.id === id)
        })
    })
    const vaults = useSelector(getVaults)
    const currentChatVault = vaults.find(vault => vault.id === currentChat?.vault_id)
    return (
        <div className={classNames(cls.ChatInfo, {}, [])}>
            <div className={cls.title}>
                {currentChat?.name}
            </div>
            <div className={cls.description}>{" - " + currentChatVault?.name}</div>
            <div className={cls.actions}>

            </div>
        </div>
    )
}
