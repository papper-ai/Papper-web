import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"

interface RegisterBySecretProps {
    secret: string;
    name: string;
    surname: string;
    login: string;
    password: string;
}

export const registerBySecret = createAsyncThunk<string, RegisterBySecretProps, ThunkConfig<string>>(
    "register",
    async (props, { extra, dispatch, rejectWithValue }) => {
        try {
            const response = await extra.api.post<string>("auth/registration", props, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            if (!response.data) {
                throw new Error()
            }
        } catch (e) {
            console.log(e)
            return rejectWithValue("error")
        }
    }
)
