import classNames from 'classnames';
import './AuthForm.scss';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useState } from 'react';

export const enum FormType {
    LOGIN = 'login',
    REGISTER = 'register'
}


interface AuthFormProps {
    className?: string
    formType: FormType
}

export const AuthForm = (props: AuthFormProps) => {

    const [toggle, setToggle] = useState(false);

    const {
        formType,
        className
    } = props
    const handleToggle = () => {
        setToggle(!toggle);
    }


    return (
        <div className={classNames('container', {"active": toggle})} id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <span>or use your email for registeration</span>
                    <Input type="text" placeholder="Секретный ключ" />
                    <Input type="text" placeholder="Name" />
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Button>Sign Up</Button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <span>or use your email password</span>
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Button>Sign In</Button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <Button onClick={handleToggle} className="hidden">
                            Sign In
                        </Button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <Button onClick={handleToggle}className="hidden">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

