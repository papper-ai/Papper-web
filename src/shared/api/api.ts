import axios from "axios"

const baseUrl = "http://ontollm.semograph.com:28080"

export const $api = axios.create({
    baseURL: baseUrl
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    return config
})
