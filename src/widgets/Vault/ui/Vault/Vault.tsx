import classNames from "classnames"
import { useEffect, useState } from "react"
import { getVaultsPreview } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { Collapse } from "shared/ui/Collapse/Collapse"
import { Text } from "shared/ui/Text/Text"
import { NewVaultModal } from "../NewVaultModal/NewVaultModal"
import * as cls from "./Vault.module.scss"

interface VaultProps {
    className?: string
}

export const Vault = ({ className }: VaultProps) => {
    const [login, setLogin] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        async function getVaults () {
            const result = await dispatch(getVaultsPreview({}))
            console.log(result)
        }
        getVaults()
    }, [])
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

    console.log(login)
    return (
        <div className={classNames(cls.Vault, {}, [className])}>
            <Text title={login} text="Ваши документы" />
            <Button onClick={() => setModalOpen(true)} theme={ThemeButton.LIST}>Добавить хранилище</Button>
            <NewVaultModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <Collapse></Collapse>
        </div>
    )
}
