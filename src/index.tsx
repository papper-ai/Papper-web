import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AntProvider } from "app/providers/AntProvider"
import { StoreProvider } from "app/providers/StoreProvider"
import App from "./app/App"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <BrowserRouter>
        <StoreProvider>
            <AntProvider>
                <App />
            </AntProvider>
        </StoreProvider>
    </BrowserRouter>
)
