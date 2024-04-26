import "./styles/index.scss"
import "./styles/reset.scss"
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import { AppRouter } from "./providers/router"

const App = () => {
    return (
        <>
            <div className="app dark">
                <AppRouter />
            </div>
        </>

    )
}

export default App
