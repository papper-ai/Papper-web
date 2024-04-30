import { ConfigProvider } from "antd"
import { themeAnt } from "../model/theme"

interface AntProviderProps {
    children: React.ReactNode
}

export const AntProvider = ({ children }: AntProviderProps) => {
    return (
        <ConfigProvider theme={themeAnt}>
            {children}
        </ConfigProvider>
    )
}
