import { RadioChangeEvent, theme } from "antd"
import classNames from "classnames"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { getVaults } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
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
}

export const NewChatModal = memo((props: NewChatModalProps) => {
    const { className, isOpen, onClose } = props
    const [selectItem, setSelectItem] = useState()
    const [newChatName, setNewChatName] = useState("")
    const vaults = useSelector(getVaults)
    const dispatch = useAppDispatch()
    const handleChangeSelectItem = useCallback((e: RadioChangeEvent) => {
        setSelectItem(e.target.value)
    }, [setSelectItem])
    const handleCreateNewChat = useCallback(() => {
        dispatch(createNewChat({ name: newChatName, vaultId: selectItem as string }))
    }, [dispatch, newChatName, selectItem])
    const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChatName(e.target.value)
    }, [setNewChatName])
    const radioButtonVaults: RadioItem[] = useMemo(() => vaults.map((item) => ({ value: item.id, label: item.name })), [vaults])
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
            <div className={classNames(cls.NewChatModal, {}, [className])}>
                <Text textTheme={TextTheme.VAULT} title="Создание нового чата" />
                <FormInput value={newChatName} onChange={handleChangeInput} placeholder="Название чата" />
                <Text textTheme={TextTheme.VAULT} text="Выберите хранилище" />
                <RadioButton value={selectItem} onChange={handleChangeSelectItem} items={radioButtonVaults}/>
                <Button theme={ThemeButton.LIST} onClick={handleCreateNewChat}>Создать</Button>
            </div>
        </Modal>
    )
})
