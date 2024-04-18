import classNames from 'classnames'
import './AuthForm.scss'
import { useState } from 'react'
import { TogglePanel } from '../TogglePanel/TogglePanel'
import { FormContainer } from '../FormContainer/FormContainer'

export const AuthForm = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
        <div className={classNames('container', { active: toggle })}>
            <FormContainer title='Регистрация' formType={'sign-up'} buttonName='Создать аккаунт'/>
            <FormContainer title='Вход' formType={'sign-in'} buttonName='Войти'/>
            <div className="toggle-container">
                <div className="toggle">
                    <TogglePanel
                        className="toggle-left"
                        title="Войти в уже существующий аккаунт"
                        description="Войдите в свою учетную запись, если у вас уже есть аккаунт"
                        buttonName="Войти в аккаунт"
                        onClick={handleToggle} />
                    <TogglePanel
                        className="toggle-right"
                        title="Привет, друг!"
                        description="Создайте новый аккаунт, если ещё не зарегистрированы"
                        buttonName="Создать новый аккаунт"
                        onClick={handleToggle} />
                </div>
            </div>
        </div>

  )
}
