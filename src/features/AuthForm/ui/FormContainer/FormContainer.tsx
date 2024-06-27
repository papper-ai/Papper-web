import "./FormContainer.scss"
import { Form, message } from "antd"
import { memo, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuth } from "app/providers/AuthProvider"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { Button } from "shared/ui/Button/Button"
import { FormInput } from "shared/ui/Input/Input"
import { getLoginError } from "../../model/selectors/getLogin/getLoginError"
import { getLoginLogin } from "../../model/selectors/getLogin/getLoginLogin"
import { getLoginPassword } from "../../model/selectors/getLogin/getLoginPassword"
import { getRegisterError } from "../../model/selectors/getRegister/getRegisterError"
import { getRegisterLogin } from "../../model/selectors/getRegister/getRegisterLogin"
import { getRegisterPassword } from "../../model/selectors/getRegister/getRegisterPassword"
import { getRegisterSecret } from "../../model/selectors/getRegister/getRegisterSecret"
import { getRegisterSuccess } from "../../model/selectors/getRegister/getRegisterSuccess"
import { authByLogin } from "../../model/services/login/authByLogin"
import { registerBySecret } from "../../model/services/register/registerBySecret"
import { loginActions } from "../../model/slice/loginSlice"
import { registerActions } from "../../model/slice/registerSlice"

export type FormType = "sign-up" | "sign-in";

interface FormContainerProps {
    className?: string,
    title: string,
    description?: string,
    buttonName: string,
    formType: FormType,
    handleToggle: () => void
}

export const FormContainer = memo((props: FormContainerProps) => {
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const login = useSelector(getLoginLogin)
    const password = useSelector(getLoginPassword)
    const secret = useSelector(getRegisterSecret)
    const registerLogin = useSelector(getRegisterLogin)
    const registerPassword = useSelector(getRegisterPassword)
    const registerError = useSelector(getRegisterError)
    const loginError = useSelector(getLoginError)
    const registerSuccess = useSelector(getRegisterSuccess)
    const auth = useAuth()
    const {
        title,
        description,
        buttonName,
        formType,
        handleToggle
    } = props

    const isSignUp = formType === "sign-up"
    useEffect(() => {
        if (registerError) {
            messageApi.error("Ошибка при регистрации")
        }
        if (registerSuccess) {
            handleToggle()
            messageApi.success("Регистрация прошла успешно")
        }
    }, [registerError, messageApi, registerSuccess])

    useEffect(() => {
        if (loginError) {
            messageApi.error("Неверный логин или пароль")
        }
    }, [loginError, messageApi])

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
        } else {
            result = await dispatch(authByLogin({ login, password }))
            if (result.meta.requestStatus === "fulfilled") {
                navigate("/main")
                auth.login?.()
            }
        }
        console.log(result)
    }, [formType, dispatch, secret, registerLogin, registerPassword, login, password, navigate, auth])
    return (
        <>
            {contextHolder}
            <div className={"form-container " + formType}>
                <Form>
                    <h1>{title}</h1>
                    <span>{description}</span>
                    {isSignUp && (
                        <>
                            <Form.Item className="formItem" name="secret" rules={[{ required: true, message: "Поле обязательно для заполнения" }]}>
                                <FormInput value={secret} onChange={onChangeSecret} type="text" placeholder="Секретный ключ" />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item className="formItem" name="login"
                        rules={[{ required: true, message: "Поле обязательно для заполнения" },
                            { min: 3, message: "Минимальная длина 3 символа" },
                            { max: 32, message: "Максимальная длина 32 символа" }]}
                    >
                        <FormInput value={isSignUp ? registerLogin : login} onChange={onChangeLogin} type="text" placeholder="Логин" />
                    </Form.Item>
                    <Form.Item className="formItem" name="password"
                        rules={[{ required: true, message: "Поле обязательно для заполнения" },
                            { min: 3, message: "Минимальная длина 3 символа" },
                            { max: 32, message: "Максимальная длина 32 символа" },
                            { pattern: /(?=.*[a-z])/, message: "Пароль должен содержать хотя бы одну строчную букву" },
                            { pattern: /(?=.*[A-Z])/, message: "Пароль должен содержать хотя бы одну заглавную букву" },
                            { pattern: /(?=.*[0-9])/, message: "Пароль должен содержать хотя бы одну цифру" },
                            { pattern: /(?=.*[!@#$%^&*()])/, message: "Пароль должен содержать хотя бы один специальный символ: !@#$%^&*()" }
                        ]}>
                        <FormInput value={isSignUp ? registerPassword : password} onChange={onChangePassword} isPassword placeholder="Пароль" />
                    </Form.Item>
                    <Button onClick={onLoginClick}>{buttonName}</Button>
                </Form>
            </div>

        </>
    )
})
