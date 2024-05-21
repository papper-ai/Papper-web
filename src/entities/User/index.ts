import { getUserAuth } from "./model/selectors/getUserLogin"
import { userActions, userReducer } from "./model/slice/userSlice"
import { User } from "./model/types/User"
export {
    User,
    getUserAuth,
    userReducer,
    userActions
}
