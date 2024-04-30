import axios from "axios"
import { REFRESH_TOKEN_KEY } from "../const/localStorage"

const baseUrl = "http://ontollm.semograph.com:28080"

export const $api = axios.create({
    baseURL: baseUrl
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(REFRESH_TOKEN_KEY)}`
    return config
})
