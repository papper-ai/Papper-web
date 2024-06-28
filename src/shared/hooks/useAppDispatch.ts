import { useDispatch } from "react-redux"
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AppDispatch } from "app/providers/StoreProvider"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<AppDispatch>()
