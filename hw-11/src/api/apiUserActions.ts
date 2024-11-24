import { AxiosResponse } from 'axios'

import httpClient from './httpClient'
import type { GetUserResponse, LoginResponse, RegisterResponse } from '@/types/typeResponse'

export async function userLogin(dataObj: any): Promise<LoginResponse> {
    const res: AxiosResponse = await httpClient.post('/api/auth/login', dataObj)
    const data: LoginResponse = res.data

    return data
}

export async function userRegister(dataObj: any): Promise<RegisterResponse> {
    const res: AxiosResponse = await httpClient.post('/users/register', dataObj)
    const data: RegisterResponse = res.data

    return data
}

export async function userGetMe(): Promise<GetUserResponse> {
    const res: AxiosResponse = await httpClient.get('/users/my-profile')
    const data: GetUserResponse = res.data

    return data
}
