import { AuthPage } from "pages/AuthPage"
import { MainPage } from "pages/MainPage"
import { VaultPage } from "pages/VaultPage"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
    MAIN = "main",
    AUTH = "auth",
    VAULT = "vault"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/main",
    [AppRoutes.VAULT]: "/vault",
    [AppRoutes.AUTH]: "/"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.VAULT]: {
        path: RoutePath[AppRoutes.VAULT],
        element: <VaultPage />
    },
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <MainPage />
    },
    [AppRoutes.AUTH]: {
        path: RoutePath[AppRoutes.AUTH],
        element: <AuthPage />
    }

}
