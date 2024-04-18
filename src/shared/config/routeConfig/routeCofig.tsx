import { AuthPage } from 'pages/AuthPage'
import { MainPage } from 'pages/MainPage'
import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
    MAIN = 'main',
    AUTH = 'auth',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/main',
  [AppRoutes.AUTH]: '/'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />
  },
  [AppRoutes.AUTH]: {
    path: RoutePath[AppRoutes.AUTH],
    element: <AuthPage />
  }

}
