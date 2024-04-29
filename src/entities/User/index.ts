import { User } from "./model/types/User"
import { getUserLogin } from "./model/selectors/getUserLogin"
import { userActions, userReducer } from "./model/slice/userSlice"

export {
    User,
    getUserLogin,
    userReducer,
    userActions
}
