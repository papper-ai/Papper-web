import "./styles/index.scss"
import "./styles/reset.scss"
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import { useEffect } from "react"
import { AppRouter } from "./providers/router"

const App = () => {
    useEffect(() => {
        document.body.classList.add("dark")
    }, [])
    return (
        <>
            <div className="app">
                <AppRouter />
            </div>
        </>

    )
}

export default App
