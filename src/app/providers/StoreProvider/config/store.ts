import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { StateSchema } from "./StateSchema"
import { tokenReducer } from "entities/Token"
import { loginReducer } from "features/AuthForm"
import { $api } from "shared/api/api"
import { NavigateFunction } from "react-router-dom"

export const createReduxStore = (navigate: NavigateFunction, initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        token: tokenReducer,
        login: loginReducer
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
