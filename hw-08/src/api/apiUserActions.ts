import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

import { FormValuesI, GetUsersResI, UserLoginI, UserRegisterI } from '../types/types'

export async function userLogin(dataObj: FormValuesI): Promise<UserLoginI> {
    const res: AxiosResponse = await axios.post('/api/auth/login', dataObj)
    const data: UserLoginI = res.data

    return data
}

export async function userRegister(dataObj: FormValuesI): Promise<UserRegisterI> {
    const res: AxiosResponse = await axios.post('/users/register', dataObj)
    const data: UserRegisterI = res.data

    return data
}

export async function userGetMe(): Promise<GetUsersResI> {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        } as RawAxiosRequestHeaders
    }

    const res: AxiosResponse = await axios.get('/users/my-profile', config)
    const data: GetUsersResI = res.data

    return data
}
