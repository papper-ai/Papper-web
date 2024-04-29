import classNames from "classnames"
import * as cls from "./VaultPage.module.scss"
import { Sidebar } from "widgets/Sidebar"
import { Vault } from "widgets/Vault"
interface VaultPageProps {
    className?: string
}

const VaultPage = ({ className }: VaultPageProps) => {
    return (
        <div className={classNames(cls.VaultPage, {}, [className])}>
            <Sidebar/>
            <Vault/>
        </div>
    )
}

export default VaultPage
