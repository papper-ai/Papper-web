import axios from "axios"
import type { TokenSchema } from "entities/Token"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../const/localStorage"

export const baseUrl = "https://api.papper.tech/api/"

export const $api = axios.create({
    baseURL: baseUrl
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.response.data.detail === "Token expired") {
            const response = await axios.post<TokenSchema>(`${baseUrl}auth/refresh_access_token`, { refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY) })
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token.token)
            return $api.request(originalRequest)
        }
    }
)
