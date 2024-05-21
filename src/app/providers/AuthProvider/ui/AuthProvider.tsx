import { useEffect, useState } from "react"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "shared/const/localStorage"
import { AuthContext, AuthContextProps } from "../lib/AuthContext"

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState(true)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
    const login = () => setIsAuth(true)
    const providerValue: AuthContextProps = { isAuth, login, logout }
    useEffect(() => {
        localStorage.getItem(ACCESS_TOKEN_KEY) ? setIsAuth(true) : setIsAuth(false)
        console.log(isAuth)
    }, [])
    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}
