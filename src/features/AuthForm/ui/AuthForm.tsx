import classNames  from 'classnames';
import * as cls from './AuthForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

export const enum FormType{
    LOGIN = 'login',
    REGISTER = 'register'
}


interface AuthFormProps {
    className?: string
    formType: FormType
}

export const AuthForm = (props: AuthFormProps) => {


    const {
        formType,
        className
    } = props
    let formContainer;
    if(formType === FormType.REGISTER){
        formContainer = (
            <form inputMode='text' className={cls.form} action="registration">
                <Input placeholder='Секретный ключ' />
                <Input placeholder='Имя' />
                <Input placeholder='Фамилия' />
                <Input placeholder='Логин' />
                <Input placeholder='Пароль' />
                <Button theme={ThemeButton.PRIMARY}>Регистрация</Button>
                <Button theme={ThemeButton.SECONDARY}>Вход</Button>
            </form>
        )
    } else if(formType === FormType.LOGIN){
        formContainer = (
            <form inputMode='text' className={cls.form} action="login">
                <Input placeholder='Логин' />
                <Input placeholder='Пароль' />
                <Button theme={ThemeButton.PRIMARY}>Вход</Button>
                <Button theme={ThemeButton.SECONDARY}>Регистрация</Button>
            </form>
        )
    }
    


    return (
        <div className={cls.FormContainer}>
            {formContainer}
        </div>
    );
}

