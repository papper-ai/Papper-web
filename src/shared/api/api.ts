import axios from "axios"
import { getToken } from "entities/Token"
import { useSelector } from "react-redux"
import { REFRESH_TOKEN_KEY } from "shared/const/localStorage"

const baseUrl = "http://ontollm.semograph.com:28080"

export const $api = axios.create({
    baseURL: baseUrl
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(REFRESH_TOKEN_KEY)}`
    return config
})
