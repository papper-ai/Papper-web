import { RadioChangeEvent, Button, Empty } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import classNames from "classnames"
import { memo, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { chatsApi } from "entities/Chat"
import { getVaults } from "entities/Vault"
import { FormInput } from "shared/ui/Input/Input"
import { Modal } from "shared/ui/Modal/Modal"
import { RadioButton, RadioItem } from "shared/ui/RadioButton/RadioButton"
import { Text, TextTheme } from "shared/ui/Text/Text"
import * as cls from "./NewChatModal.module.scss"

interface NewChatModalProps {
    className?: string
    isOpen?: boolean
    onClose?: () => void
    messageApi: MessageInstance
}

export const NewChatModal = memo((props: NewChatModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        messageApi
    } = props
    const [createNewChat, { isLoading, error: newChatError }] = chatsApi.useCreateNewChatMutation()
    const [newChatName, setNewChatName] = useState("")
    const vaults = useSelector(getVaults)
    const radioButtonVaults: RadioItem[] = useMemo(() => vaults.map((item) => ({ value: item.id, label: item.name })), [vaults])

    const [selectItem, setSelectItem] = useState(radioButtonVaults[0]?.value)
    const handleChangeSelectItem = useCallback((e: RadioChangeEvent) => {
        setSelectItem(e.target.value)
    }, [setSelectItem])
    // useEffect(() => {
    //     if (newChatError) {
    //         messageApi.open({
    //             type: "error",
    //             content: "Не удалось создать чат",
    //             duration: 3
    //         })
    //     }
    //     if (!isLoading && !newChatError && chat) {
    //         messageApi.open({
    //             type: "success",
    //             content: "Чат создан",
    //             duration: 3
    //         })
    //     }
    // }, [isLoading, messageApi, newChatError])
    const handleCreateNewChat = useCallback(async () => {
        console.log(selectItem, newChatName)
        if (!selectItem) return
        if (!newChatName) return
        try {
            const result = await createNewChat({ name: newChatName, vault_id: selectItem })
            console.log(result)
        } catch (e) {
            messageApi.open({
                type: "error",
                content: "Не удалось создать чат",
                duration: 3
            })
        }
    }, [createNewChat, messageApi, newChatName, selectItem])
    const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChatName(e.target.value)
    }, [setNewChatName])
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
            <div className={classNames(cls.NewChatModal, {}, [className])}>
                {radioButtonVaults.length > 0
                    ? <>
                        <Text textTheme={TextTheme.VAULT} title="Создание нового чата" />
                        <FormInput value={newChatName} onChange={handleChangeInput} placeholder="Название чата" />
                        <Text textTheme={TextTheme.INLINE} text="Выберите хранилище" />
                        <RadioButton value={selectItem} onChange={handleChangeSelectItem} items={radioButtonVaults} />
                        <Button disabled={isLoading} className={cls.btn} onClick={handleCreateNewChat}>Создать</Button>

                    </>
                    : <Empty description="Нет доступных хранилищ для создания чата" />
                }
            </div>
        </Modal>
    )
})
