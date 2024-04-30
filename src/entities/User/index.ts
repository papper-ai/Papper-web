import { getUserLogin } from "./model/selectors/getUserLogin"
import { userActions, userReducer } from "./model/slice/userSlice"
import { User } from "./model/types/User"

export {
    User,
    getUserLogin,
    userReducer,
    userActions
}
