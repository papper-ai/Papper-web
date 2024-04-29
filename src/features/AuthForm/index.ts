import { loginReducer } from "./model/slice/loginSlice"
import { AuthForm } from "./ui/AuthForm/AuthForm"
import { LoginSchema, RegisterSchema } from "./model/types/AuthSchema"
import { registerReducer } from "./model/slice/registerSlice"

export {
    AuthForm,
    loginReducer,
    LoginSchema,
    registerReducer,
    RegisterSchema
}
