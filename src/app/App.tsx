import "./styles/index.scss"
import "./styles/reset.scss"
import "./styles/variables/global.scss"
import "./styles/themes/dark.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UnderConstructionPage } from "pages/UnderConstructionPage"
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeCofig"
import { ACCESS_TOKEN_KEY } from "shared/const/localStorage"
import { useAuth } from "./providers/AuthProvider"
import { AppRouter } from "./providers/router"

const App = () => {
    const navigate = useNavigate()
    const { checkAuth } = useAuth()
    useEffect(() => {
        document.body.classList.add("dark")
        // Убрать залупу в будушем
        // localStorage.setItem(ACCESS_TOKEN_KEY, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWJlYTM2OGUtNWVlMy00MmI4LThjMGItMTk4MTczNzUzNDU4IiwibG9naW4iOiJUZXN0IiwiZXhwIjoxNzE1MDk5ODU3fQ.VRrLMJbpm4zeaT5jUuXcLathrAR_JAQ18JW1sjesACigdN5_0J4EXAFGvBpgxDyMBZVtlo58X0AYt09ZgZ5gcl_8pSIeadXdf9NlP0VzYmj9WbKjlxNakh8XZhruon2_oMVbBsHsdtXjK_5rSNOyz53KWSTTiH-3UwPGT8I8aW3rFF_VeSPbGMHULqP2X5IZsP9XQGNXHBJBXVQGS-UorZi5YeoDIywHV4RBlbdUxwHQjui6LVU9nNFN1o4Gf86oyofzor5RUuxhSIRe0t2EUBuUwxCIOPaDTn6hEZRFDzhi7aEAjq1JQmGoQ9noShrtu8E6cwBDf3t-h0bYy6jb7Q")
        checkAuth()
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
