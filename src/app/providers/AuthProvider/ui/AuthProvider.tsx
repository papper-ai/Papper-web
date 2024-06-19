import { useEffect, useState } from "react"
import { fetchUserData } from "entities/User"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { AuthContext, AuthContextProps } from "../lib/AuthContext"

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch()
    const [isAuth, setIsAuth] = useState(true)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
    const login = () => setIsAuth(true)
    // Скорее всего не рабочий вариант переделать надо в будущем
    const checkAuth = async () => {
        const res = await dispatch(fetchUserData())
        if (res.meta.requestStatus === "rejected") {
            setIsAuth(false)
        }
    }
    const providerValue: AuthContextProps = { isAuth, login, logout, checkAuth }
    // useEffect(() => {
    //     localStorage.getItem(ACCESS_TOKEN_KEY) ? setIsAuth(true) : setIsAuth(false)
    //     console.log(isAuth)
    // }, [])
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}
