import "./FormContainer.scss"
import { Input } from "shared/ui/Input/Input"
import { Button } from "shared/ui/Button/Button"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginActions } from "features/AuthForm/model/slice/loginSlice"
import { useCallback } from "react"
import { getLoginLogin } from "features/AuthForm/model/selectors/getLoginLogin"
import { getLoginPassword } from "features/AuthForm/model/selectors/getLoginPassword"
import { authByLogin } from "features/AuthForm/model/login/authByLogin"
import { TokenSchema } from "entities/Token"
import { useAppDispatch } from "shared/hooks/useAppDispatch"

export type FormType = "sign-up" | "sign-in";

interface FormContainerProps {
    className?: string,
    title: string,
    description?: string,
    buttonName: string,
    formType: FormType
}

export const FormContainer = (props: FormContainerProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const login = useSelector(getLoginLogin)
    const password = useSelector(getLoginPassword)
    const {
        title,
        description,
        buttonName,
        formType
    } = props
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate("/main")
    }
    const isSignUp = formType === "sign-up"
    const onChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setLogin(e.target.value))
    }, [dispatch])
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(e.target.value))
    }, [dispatch])
    const onLoginClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const result = await dispatch(authByLogin({ login, password }))
        console.log(result)
    }, [dispatch, login, password])
    return (
        <div className={"form-container " + formType}>
            <form>
                <h1>{title}</h1>
                <span>{description}</span>
                {isSignUp && (
                    <>
                        <Input type="text" placeholder="Секретный ключ" />
                        <Input type="text" placeholder="Имя" />
                        <Input type="text" placeholder="Фамилия" />
                    </>
                )}
                <Input value={login} onChange={onChangeLogin} type="text" placeholder="Логин" />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="Пароль" />
                <Button onClick={onLoginClick}>{buttonName}</Button>
            </form>
        </div>
    )
}
