import "./styles/index.scss"
import "./styles/reset.scss"
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import * as CryptoJS from "crypto-js"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UnderConstructionPage } from "pages/UnderConstructionPage"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { ACCESS_TOKEN_KEY } from "shared/const/localStorage"
import { useAuth } from "./providers/AuthProvider"
import { AppRouter } from "./providers/router"
const App = () => {
    const navigate = useNavigate()
    const { checkAuth } = useAuth()
    useEffect(() => {
        document.body.classList.add("dark")
        checkAuth()
    }, [])
    return (
        <>
            <div className="app">
                <AppRouter />
            </div>
        </>

    )
}

export default App
