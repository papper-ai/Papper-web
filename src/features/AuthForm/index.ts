import { loginReducer } from "./model/slice/loginSlice"
import { registerReducer } from "./model/slice/registerSlice"
import { LoginSchema, RegisterSchema } from "./model/types/AuthSchema"
import { AuthForm } from "./ui/AuthForm/AuthForm"

export {
    AuthForm,
    loginReducer,
    LoginSchema,
    registerReducer,
    RegisterSchema
}
