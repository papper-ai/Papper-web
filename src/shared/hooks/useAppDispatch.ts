import { useDispatch } from "react-redux"
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AppDispatch } from "app/providers/StoreProvider"
// TODO: useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
