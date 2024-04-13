import { AuthForm } from 'features/AuthForm';
import { FormType } from 'features/AuthForm/ui/AuthForm';

const AuthPage = () => {
    return (
        <div>
            <AuthForm formType={FormType.REGISTER} />
        </div>
    );
}

export default AuthPage;