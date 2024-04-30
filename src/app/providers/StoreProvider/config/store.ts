import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router-dom"
import { loginReducer, registerReducer } from "features/AuthForm"
import { tokenReducer } from "entities/Token"
import { userReducer } from "entities/User"
import { vaultsReducer } from "entities/Vault"
import { $api } from "shared/api/api"
import { StateSchema } from "./StateSchema"

export const createReduxStore = (navigate: NavigateFunction, initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        token: tokenReducer,
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        vaults: vaultsReducer
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
