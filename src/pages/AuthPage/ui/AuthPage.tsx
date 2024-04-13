import { AuthForm } from 'features/AuthForm';
import { FormType } from 'features/AuthForm/ui/AuthForm';

const AuthPage = () => {
    return (

        <AuthForm formType={FormType.REGISTER} />

    );
}

export default AuthPage;