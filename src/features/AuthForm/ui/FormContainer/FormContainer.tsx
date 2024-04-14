import classNames from 'classnames';
import './FormContainer.scss';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';

export type FormType = 'sign-up' | 'sign-in';


interface FormContainerProps {
    className?: string,
    title: string,
    description?: string,
    buttonName: string,
    formType: FormType
}

export const FormContainer = (props: FormContainerProps) => {
    const {
        className,
        title,
        description,
        buttonName,
        formType
    } = props

    const isSignUp = formType === 'sign-up';

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
                <Input type="text" placeholder="Логин" />
                <Input type="password" placeholder="Пароль" />
                <Button>{buttonName}</Button>
            </form>
        </div>
    );
}

