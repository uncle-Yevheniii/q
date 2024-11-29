import axios, { AxiosInstance } from 'axios'

const httpClient: AxiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com',
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' }
})

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error.response)

        if (error.response.status === 401) {
            // window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export function setAuthToken(token: string): void {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeAuthToken(): void {
    httpClient.defaults.headers.common['Authorization'] = null
}

export default httpClient
