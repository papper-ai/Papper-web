import { AuthPage } from "pages/AuthPage";
import "./styles/index.scss";
import "./styles/reset.scss";
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import { AppRouter } from "./providers/router";
import { Modal } from "shared/ui/Modal/Modal";


const App = () => {
    return (
        <>
            <div className="app dark">
                <AppRouter />
            </div>
        </>

    );
}

export default App;