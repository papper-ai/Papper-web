import { useDispatch } from "react-redux"
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { AppDispatch } from "app/providers/StoreProvider"
import { ThunkDispatch } from "@reduxjs/toolkit"
// TODO: useAppDispatch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<AppDispatch>()
