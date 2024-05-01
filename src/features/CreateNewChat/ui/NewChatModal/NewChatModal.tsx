import { RadioChangeEvent, theme } from "antd"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getVaults } from "entities/Vault"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
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

export const NewChatModal = (props: NewChatModalProps) => {
    const { className, isOpen, onClose } = props
    const [radioButtonVaults, setRadioButtonVaults] = useState<RadioItem[]>([])
    const [selectItem, setSelectItem] = useState()
    const [newChatName, setNewChatName] = useState("")
    const vaults = useSelector(getVaults)
    const dispatch = useAppDispatch()
    const handleChangeSelectItem = (e: RadioChangeEvent) => {
        setSelectItem(e.target.value)
    }
    const handleCreateNewChat = () => {
        dispatch(createNewChat({ name: newChatName, vaultId: selectItem as string }))
    }
    useEffect(() => {
        setRadioButtonVaults(vaults.map((item) => ({ value: item.id, label: item.name })))
    }, [vaults])
    return (
        <Modal onClose={onClose} isOpen={isOpen} >
            <div className={classNames(cls.NewChatModal, {}, [className])}>
                <Text textTheme={TextTheme.VAULT} title="Создание нового чата" />
                <Input value={newChatName} onChange={(e) => setNewChatName(e.target.value)} placeholder="Название чата" />
                <Text textTheme={TextTheme.VAULT} text="Выберите хранилище" />
                <RadioButton value={selectItem} onChange={handleChangeSelectItem} items={radioButtonVaults}/>
                <Button theme={ThemeButton.LIST} onClick={handleCreateNewChat}>Создать</Button>
            </div>
        </Modal>
    )
}
