import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';


export const AuthPage = () => {
    return (
        <div>
            AuthPage
            <Button theme={ThemeButton.PRIMARY}>Регистрация</Button>
            <Button theme={ThemeButton.SECONDARY}>Вход</Button>
            <Input placeholder='Логин' />
        </div>
    );
}

