import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema"
import { User } from "../types/User"



export const fetchUserData = createAsyncThunk<User, void, ThunkConfig<string>>(
    "fetchUserData",
    async (_, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.get<User>("auth/get_login")

            if (!response.data) {
                throw new Error()
            }
            const data = response.data
            return data
        } catch (e) {
            return rejectWithValue(e as string)
        }
    }
)
