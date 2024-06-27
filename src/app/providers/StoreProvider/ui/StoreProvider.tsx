import { FC } from "react"
import { Provider } from "react-redux"
import { StateSchema } from "../config/StateSchema"
import { createReduxStore } from "../config/store"

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: StateSchema
}
export let store: ReturnType<typeof createReduxStore>

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
    const store = createReduxStore(initialState)

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
