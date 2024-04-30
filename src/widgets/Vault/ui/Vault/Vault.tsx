import { ItemType } from "antd/es/breadcrumb/Breadcrumb"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getVaults, getVaultsIsLoading, getVaultsPreview, IDocument, vaultsActions } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button, ThemeButton } from "shared/ui/Button/Button"
import { Acordion } from "shared/ui/Collapse/Collapse"
import type { AccordionItem } from "shared/ui/Collapse/Collapse"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { NewVaultModal } from "../NewVaultModal/NewVaultModal"
import * as cls from "./Vault.module.scss"

interface VaultProps {
    className?: string
}

export const Vault = ({ className }: VaultProps) => {
    const [login, setLogin] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const vaultsIsLoading = useSelector(getVaultsIsLoading)
    const [accordionVaults, setaccordionVaults] = useState<AccordionItem>([])
    const vaults = useSelector(getVaults)
    const dispatch = useAppDispatch()
    useEffect(() => {
        async function getVaults () {
            const result = await dispatch(getVaultsPreview({}))
        }
        getVaults()
    }, [])
    useEffect(() => {
        setaccordionVaults(vaults.map((item) => ({
            key: item.id,
            label: <Text title={item.name} text={item.type} textTheme={TextTheme.INLINE} />,
            children: <Acordion
                items=
                    {item.documents?.map((doc: IDocument) => {
                        return {
                            key: doc.id,
                            label: <Text key={doc.id} title={doc.name} textTheme={TextTheme.INLINE} />,
                            children: <Text key={doc.id} text={doc.text} textTheme={TextTheme.INLINE} />
                        }
                    })}
            />
        })))
    }, [vaults])
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
    const handleAccordionChange = (key: string) => {
        try {
            $api.get<IDocument[]>(`/vault/get_vault_documents/${key}`).then((res) => {
                dispatch(vaultsActions.addVaultDocument(res.data))
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
            {/* <Collapse></Collapse> */}
            {vaultsIsLoading ? <div>loading</div> : <Acordion onChange={handleAccordionChange} items={accordionVaults} />}
            <NewVaultModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}
