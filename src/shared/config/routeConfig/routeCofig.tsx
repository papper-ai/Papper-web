/* eslint-disable @conarti/feature-sliced/layers-slices */
import { RouteProps } from "react-router-dom"
import { AuthPage } from "pages/AuthPage"
import { MainPage } from "pages/MainPage"
import { VaultPage } from "pages/VaultPage"

export enum AppRoutes {
    MAIN = "main",
    MAIN_CHAT = "main-chat",
    AUTH = "auth",
    VAULT = "vault",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/main",
    [AppRoutes.MAIN_CHAT]: "/main/:id",
    [AppRoutes.VAULT]: "/vault",
    [AppRoutes.AUTH]: "/auth"
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
    [AppRoutes.MAIN_CHAT]: {
        path: RoutePath[AppRoutes.MAIN_CHAT],
        element: <MainPage />
    },
    [AppRoutes.AUTH]: {
        path: RoutePath[AppRoutes.AUTH],
        element: <AuthPage />
    }

}
