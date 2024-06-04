import classNames from "classnames"
import { useSelector } from "react-redux"
import { getCurrentChat } from "features/CreateNewChat"
import { getVaults } from "entities/Vault"
import * as cls from "./ChatInfo.module.scss"

export const ChatInfo = () => {
    const currentChat = useSelector(getCurrentChat)
    const vaults = useSelector(getVaults)
    const currentChatVault = vaults.find(vault => vault.id === currentChat?.vault_id)
    return (
        <div className={classNames(cls.ChatInfo, {}, [])}>
            <div className={cls.title}>{currentChat?.name}</div>
            <div className={cls.description}>{" - " + currentChatVault?.name}</div>
            <div className={cls.actions}>

            </div>
        </div>
    )
}
