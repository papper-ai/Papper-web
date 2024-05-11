import { useSelector } from "react-redux"
import { RootState } from "app/providers/StoreProvider/config/store"

export const useAppSelector = useSelector.withTypes<RootState>()
