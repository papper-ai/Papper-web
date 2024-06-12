import { FC, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LayoutPage } from "pages/LayoutPage"
import { routeConfig } from "shared/config/routeConfig/routeCofig"
import { Loader } from "shared/ui/Loader/Loader"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter: FC = () => {
    return (
        <Suspense fallback={<Loader size="large" />}>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<LayoutPage />}>
                        <Route path={routeConfig.main.path} element={routeConfig.main.element} />
                        <Route path={routeConfig["main-chat"].path} element={routeConfig["main-chat"].element} />
                        <Route path={routeConfig.vault.path} element={routeConfig.vault.element} />
                    </Route>
                </Route>
                <Route path={routeConfig.auth.path} element={routeConfig.auth.element} />
                <Route path="/" element={<Navigate to={routeConfig.main.path || "/main"} />} />
            </Routes>
        </Suspense>

    )
}
