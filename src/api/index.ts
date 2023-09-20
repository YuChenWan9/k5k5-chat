import request from "./ApiService";

export function register(data) {
    return request('/user', {
        method: 'post',
        data
    })
}