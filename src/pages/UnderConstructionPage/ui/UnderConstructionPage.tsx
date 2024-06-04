import classNames from "classnames"
import * as cls from "./UnderConstructionPage.module.scss"

const UnderConstructionPage = () => {
    return (
        <div className={cls.underConstruction}>
            <h1 className={cls.title}>Чат-бот в разработке...</h1>
            <p className={cls.description}>Мы работаем над тем, чтобы улучшить наш сервис. Пожалуйста, зайдите позже.</p>
        </div>
    )
}
export default UnderConstructionPage
