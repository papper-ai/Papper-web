import { Input, RadioChangeEvent, theme, Button, Empty } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import classNames from "classnames"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { getCurrentChatError } from "features/CreateNewChat/model/selectors/getCurrentChatError"
import { getCurrentChatIsLoading } from "features/CreateNewChat/model/selectors/getCurrentChatIsLoading"
import { getVaults } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { FormInput } from "shared/ui/Input/Input"
import { Modal } from "shared/ui/Modal/Modal"
import { RadioButton, RadioItem } from "shared/ui/RadioButton/RadioButton"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { createNewChat } from "../../model/services/createNewChat"
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
    const newChatError = useSelector(getCurrentChatError)
    const isLoading = useSelector(getCurrentChatIsLoading)
    const [newChatName, setNewChatName] = useState("")
    const vaults = useSelector(getVaults)
    const [selectItem, setSelectItem] = useState()
    const dispatch = useAppDispatch()
    const handleChangeSelectItem = useCallback((e: RadioChangeEvent) => {
        setSelectItem(e.target.value)
    }, [setSelectItem])
    const handleCreateNewChat = useCallback(async () => {
        await dispatch(createNewChat({ name: newChatName, vaultId: selectItem as string }))
        if (!newChatError) {
            messageApi.open({
                type: "success",
                content: "Чат создан",
                duration: 2
            })
            setSelectItem(null)
            setNewChatName("")
            onClose()
        } else {
            messageApi.open({
                type: "error",
                content: "Ошибка при создании чата",
                duration: 2
            })
        }
    }, [dispatch, newChatName, selectItem])
    const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChatName(e.target.value)
    }, [setNewChatName])
    const radioButtonVaults: RadioItem[] = useMemo(() => vaults.map((item) => ({ value: item.id, label: item.name })), [vaults])
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
