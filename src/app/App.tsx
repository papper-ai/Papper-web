import "./styles/index.scss"
import "./styles/reset.scss"
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import { useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { $api } from "shared/api/api"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { AppRouter } from "./providers/router"

const App = () => {
    const navigate = useNavigate()
    useEffect(() => {
        document.body.classList.add("dark")
        const checkAuth = async () => {
            try {
                const response = await $api.get("auth/get_login")
                console.log(response)
                if (response.status === 200) {
                    navigate(RoutePath[AppRoutes.MAIN])
                }
                if (response.status === 403) {
                    navigate(RoutePath[AppRoutes.AUTH])
                }
            } catch (e) {
                navigate(RoutePath[AppRoutes.AUTH])
                console.log()
            }
        }
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
