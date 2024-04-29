import classNames from "classnames"
import * as cls from "./Vault.module.scss"
import { Text } from "shared/ui/Text/Text"
import { useSelector } from "react-redux"
import { getUserLogin } from "entities/User"
import { useEffect, useRef, useState } from "react"
import { $api } from "shared/api/api"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { Modal } from "shared/ui/Modal/Modal"
import { Input } from "shared/ui/Input/Input"
import { Selecter } from "shared/ui/Select/Selecter"
interface VaultProps {
    className?: string
}

export const Vault = ({ className }: VaultProps) => {
    const [login, setLogin] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [newVaultName, setNewVaultName] = useState("")
    const [newVaultType, setNewVaultType] = useState("graph")
    const filesRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        try {
            $api.get("/auth/get_login").then((res) => {
                setLogin(res.data.login)
            })
            console.log(login)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const handleChangeNewVaultName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVaultName(e.target.value)
    }
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewVaultType(e.target.value)
    }
    const handleSubmitNewVault = () => {
        try {
            const vaultConfig = {
                vault_name: newVaultName,
                vault_type: newVaultType
            }
            const files = filesRef.current?.files
            const formData = new FormData()
            formData.append("create_vault_credentials", JSON.stringify(vaultConfig))
            for (let i = 0; i < files?.length; i++) {
                formData.append("files", files[i])
            }
            $api.post("/vault/create_vault", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => {
                console.log(res)
            })
        } catch (e) {
            console.log(e)
        }
    }

    console.log(login)
    return (
        <div className={classNames(cls.Vault, {}, [className])}>
            <Text title={login} text="Ваши документы" />
            <Button onClick={() => setModalOpen(true)} theme={ThemeButton.LIST}>Добавить хранилище</Button>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <Text title="Добавление нового хранилища" />
                <Input value={newVaultName} onChange={handleChangeNewVaultName} placeholder="Название" />
                <Selecter value={newVaultType} onChange={handleChangeSelect} label="Выберите тип хранилища" />
                <input ref={filesRef} type="file" multiple accept="application/pdf, application/msword, text/plain" />
                <Button onClick={handleSubmitNewVault} theme={ThemeButton.LIST}>Добавить</Button>
            </Modal>
        </div>
    )
}
