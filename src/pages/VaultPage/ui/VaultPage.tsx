import classNames from "classnames"
import { Sidebar } from "widgets/Sidebar"
import { Vault } from "widgets/Vault"
import * as cls from "./VaultPage.module.scss"
interface VaultPageProps {
    className?: string
}

const VaultPage = ({ className }: VaultPageProps) => {
    return (
        <Vault/>
    )
}

export default VaultPage
