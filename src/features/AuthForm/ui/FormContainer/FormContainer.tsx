import "./FormContainer.scss"
import { Input } from "shared/ui/Input/Input"
import { Button } from "shared/ui/Button/Button"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { loginActions } from "features/AuthForm/model/slice/loginSlice"
import { memo, useCallback } from "react"
import { getLoginLogin } from "features/AuthForm/model/selectors/getLogin/getLoginLogin"
import { getLoginPassword } from "features/AuthForm/model/selectors/getLogin/getLoginPassword"
import { authByLogin } from "features/AuthForm/model/services/login/authByLogin"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { registerActions } from "../../model/slice/registerSlice"
import { registerBySecret } from "../../model/services/register/registerBySecret"
import { getRegisterSecret } from "../../model/selectors/getRegister/getRegisterSecret"
import { getRegisterName } from "../../model/selectors/getRegister/getRegisterName"
import { getRegisterSurname } from "../../model/selectors/getRegister/getRegisterSurname"
import { getRegisterLogin } from "../../model/selectors/getRegister/getRegisterLogin"
import { getRegisterPassword } from "../../model/selectors/getRegister/getRegisterPassword"

export type FormType = "sign-up" | "sign-in";

interface FormContainerProps {
    className?: string,
    title: string,
    description?: string,
    buttonName: string,
    formType: FormType
}

export const FormContainer = memo((props: FormContainerProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const login = useSelector(getLoginLogin)
    const password = useSelector(getLoginPassword)
    const secret = useSelector(getRegisterSecret)
    const registerLogin = useSelector(getRegisterLogin)
    const registerPassword = useSelector(getRegisterPassword)
    const {
        title,
        description,
        buttonName,
        formType
    } = props

    const isSignUp = formType === "sign-up"

    const onChangeLogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (formType === "sign-up") {
            dispatch(registerActions.setLogin(value))
        } else {
            dispatch(loginActions.setLogin(value))
        }
    }, [dispatch, formType])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (formType === "sign-up") {
            dispatch(registerActions.setPassword(value))
        } else {
            dispatch(loginActions.setPassword(value))
        }
    }, [dispatch, formType])

    const onChangeSecret = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(registerActions.setSecret(e.target.value))
    }, [dispatch])

    const onLoginClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let result
        if (formType === "sign-up") {
            result = await dispatch(registerBySecret({ secret, login: registerLogin, password: registerPassword }))
        } else result = await dispatch(authByLogin({ login, password }))
        console.log(result)
    }, [dispatch, login, password, secret, registerLogin, registerPassword, formType])
    return (
        <div className={"form-container " + formType}>
            <form>
                <h1>{title}</h1>
                <span>{description}</span>
                {isSignUp && (
                    <>
                        <Input value={secret} onChange={onChangeSecret} type="text" placeholder="Секретный ключ" />
                    </>
                )}
                <Input value={isSignUp ? registerLogin : login} onChange={onChangeLogin} type="text" placeholder="Логин" />
                <Input value={isSignUp ? registerPassword : password} onChange={onChangePassword} type="password" placeholder="Пароль" />
                <Button onClick={onLoginClick}>{buttonName}</Button>
            </form>
        </div>
    )
})
