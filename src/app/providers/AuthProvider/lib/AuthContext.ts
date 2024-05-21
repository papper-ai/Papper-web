import { createContext } from "react"

export interface AuthContextProps {
    isAuth?: boolean;
    login?: () => void;
    logout?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({})
