import { FC, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { MainPage } from "pages/MainPage"
import { routeConfig } from "shared/config/routeConfig/routeCofig"
import { Loader } from "shared/ui/Loader/Loader"
import LayoutPage from "pages/LayoutPage/ui/LayoutPage"

export const AppRouter: FC = () => {
    return (
        <Suspense fallback={<Loader size="large" />}>
            <Routes>
                <Route element={<LayoutPage />}>
                    <Route path={routeConfig.main.path} element={routeConfig.main.element} />
                    <Route path={routeConfig["main-chat"].path} element={routeConfig["main-chat"].element} />
                    <Route path={routeConfig.vault.path} element={routeConfig.vault.element} />
                </Route>
                <Route path={routeConfig.auth.path} element={routeConfig.auth.element} />
            </Routes>

        </Suspense>
    )
}
