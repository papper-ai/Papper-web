import { FC } from "react"
import { StateSchema } from "./config/StateSchema"
import { createReduxStore } from "./config/store"
import { Provider } from "react-redux"

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: StateSchema
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
    const store = createReduxStore(initialState)

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
