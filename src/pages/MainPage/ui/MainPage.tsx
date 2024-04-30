import classNames from "classnames"
import { Sidebar } from "widgets/Sidebar"
import * as cls from "./MainPage.module.scss"
interface MainPageProps {
    className?: string
}
const MainPage = ({ className }: MainPageProps) => {
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Sidebar />
        </div>
    )
}

export default MainPage
