import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router-dom"
import { loginReducer, registerReducer } from "features/AuthForm"
import { messageReducer } from "features/MessageSender"
import { chatsReducer } from "entities/Chat"
import { tokenReducer } from "entities/Token"
import { userReducer } from "entities/User"
import { vaultsReducer } from "entities/Vault"
import { $api } from "shared/api/api"
import { StateSchema } from "./StateSchema"

export const createReduxStore = (initialState?: StateSchema, navigate?: NavigateFunction) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        token: tokenReducer,
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        vaults: vaultsReducer,
        chats: chatsReducer,
        message: messageReducer
    }

    return configureStore<StateSchema>({
        reducer: rootReducer,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                    navigate
                }
            }
        })
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]

export type RootState = ReturnType<typeof createReduxStore>["getState"]
