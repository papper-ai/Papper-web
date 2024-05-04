import type { StateSchema, ThunkConfig, ThunkExtraArg } from "./config/StateSchema"
import { createReduxStore, AppDispatch } from "./config/store"
import { StoreProvider, store } from "./ui/StoreProvider"

export {
    StateSchema,
    ThunkConfig,
    ThunkExtraArg,
    createReduxStore,
    StoreProvider,
    AppDispatch,
    store
}
