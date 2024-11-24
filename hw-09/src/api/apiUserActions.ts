import { AxiosResponse } from 'axios'

import httpClient from './httpClient'
import type { FormValuesI, GetUsersResI, UserLoginI, UserRegisterI } from '../types/types'

export async function userLogin(dataObj: FormValuesI): Promise<UserLoginI> {
    const res: AxiosResponse = await httpClient.post('/api/auth/login', dataObj)
    const data: UserLoginI = res.data

    return data
}

export async function userRegister(dataObj: FormValuesI): Promise<UserRegisterI> {
    const res: AxiosResponse = await httpClient.post('/users/register', dataObj)
    const data: UserRegisterI = res.data

    return data
}

export async function userGetMe(): Promise<GetUsersResI> {
    const res: AxiosResponse = await httpClient.get('/users/my-profile')
    const data: GetUsersResI = res.data

    return data
}
