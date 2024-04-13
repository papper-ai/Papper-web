import { Button, ThemeButton } from 'shared/ui/Button/Button';
interface AuthPageProps {
    className?: string
}

export const AuthPage = ({className}: AuthPageProps) => {
    return (
        <div>
            AuthPage
            <Button disabled theme={ThemeButton.SECONDARY}>Bye Bye</Button>
        </div>
    );
}

