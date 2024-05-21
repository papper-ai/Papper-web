import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "app/providers/AuthProvider"
import { getUserAuth } from "entities/User"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"

export const PrivateRoute = () => {
    const { isAuth } = useAuth()
    console.log(isAuth)
    return (
        isAuth ? <Outlet /> : <Navigate to={RoutePath[AppRoutes.AUTH]} replace={true} />
    )
}
