import { DeleteOutlined, FolderAddOutlined } from "@ant-design/icons"
import { Button, List, Skeleton, Statistic, StatisticProps, message } from "antd"
import { ItemType } from "antd/es/breadcrumb/Breadcrumb"
import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"
import CountUp from "react-countup"
import Markdown from "react-markdown"
import { useSelector } from "react-redux"
import { getVaults, getVaultsIsLoading, getVaultsPreview, IDocument, vaultsActions } from "entities/Vault"
import { $api } from "shared/api/api"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Acordion } from "shared/ui/Collapse/Collapse"
import type { AccordionItem } from "shared/ui/Collapse/Collapse"
import { Loader } from "shared/ui/Loader/Loader"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { NewVaultModal } from "../NewVaultModal/NewVaultModal"
import { VaultDocuments } from "../VaultDocuments/VaultDocuments"
import { VaultExtra } from "../VaultExtra/VaultExtra"
import * as cls from "./Vault.module.scss"
import { statsFormatter } from "shared/lib/statsFormatter"

interface VaultProps {
    className?: string
}

enum VaultTypes {
    "graph" = "Граф знаний",
    "vector" = "Векторная база данных",
}

export const Vault = ({ className }: VaultProps) => {
    const [login, setLogin] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const vaultsIsLoading = useSelector(getVaultsIsLoading)
    const [accordionVaults, setaccordionVaults] = useState<AccordionItem>([])
    const vaults = useSelector(getVaults)
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useAppDispatch()

    useEffect(() => {
        setaccordionVaults(vaults.map((item) => ({
            key: item.id,
            label: <Text title={item.name} text={`Тип хранилища: ${VaultTypes[item.type]}`} textTheme={TextTheme.INLINE} />,
            children: <VaultDocuments messageApi={messageApi} vaultId={item.id} items={item.documents} />,
            extra: <VaultExtra id={item.id} messageApi={messageApi} />
        })))
    }, [messageApi, vaults])
    useEffect(() => {
        try {
            $api.get("/auth/get_login").then((res) => {
                setLogin(res.data.login)
            })
        } catch (e) {
            console.log(e)
        }
    }, [])
    const handleAccordionChange = (key: []) => {
        try {
            if (key.length > 0) {
                $api.get<IDocument[]>(`/vault/get_vault_documents/${key}`).then((res) => {
                    dispatch(vaultsActions.addVaultDocument(res.data))
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {contextHolder}
            <div className={classNames(cls.Vault, {}, [className])}>
                <div className={cls.header}>
                    <Text title={login} />
                    <Statistic style={{ display: "flex", flexDirection: "column", alignItems: "center" }} title="Количество доступных хранилищ" value={vaults.length} formatter={statsFormatter} />
                    <Button onClick={() => setModalOpen(true)} size="large" icon={<FolderAddOutlined />}>Создать хранилище</Button>
                </div>
                <div className={cls.vaultContainer}>
                    {vaultsIsLoading
                        ? (<Skeleton paragraph={{ rows: 10, width: "100%" }} >
                        </Skeleton >)
                        : <Acordion onChange={handleAccordionChange} items={accordionVaults} />}
                </div>
                <NewVaultModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>

        </>
    )
}
