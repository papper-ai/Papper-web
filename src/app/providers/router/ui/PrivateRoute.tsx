import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { useAuth } from "../../AuthProvider"

export const PrivateRoute = () => {
    const { isAuth } = useAuth()
    console.log(isAuth)
    return (
        isAuth ? <Outlet /> : <Navigate to={RoutePath[AppRoutes.AUTH]} replace={true} />
    )
}
