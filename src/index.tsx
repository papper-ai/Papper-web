import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AntProvider } from "app/providers/AntProvider"
import { AuthProvider } from "app/providers/AuthProvider"
import { StoreProvider } from "app/providers/StoreProvider"
import App from "./app/App"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <StoreProvider>
        <AuthProvider>
            <BrowserRouter>
                <AntProvider>
                    <App />
                </AntProvider>
            </BrowserRouter>
        </AuthProvider>
    </StoreProvider>
)
