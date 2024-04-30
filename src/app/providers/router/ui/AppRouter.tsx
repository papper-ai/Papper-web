import { FC, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeCofig"
import { Loader } from "shared/ui/Loader/Loader"

export const AppRouter: FC = () => {
    return (
        <Suspense fallback={<Loader size="large" />}>
            <Routes>
                {
                    Object.values(routeConfig).map(({ element, path }) => (
                        <Route key={path} path={path} element={element} />
                    ))
                }
            </Routes>

        </Suspense>
    )
}
