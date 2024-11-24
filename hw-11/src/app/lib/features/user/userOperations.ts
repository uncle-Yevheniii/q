import { createAsyncThunk } from '@reduxjs/toolkit'
import { userLogin, userRegister, userGetMe } from '@/api/apiUserActions'

export interface FormValuesI {
    username: string
    password: string
}

export const loginOperation = createAsyncThunk('user/login', async (data: FormValuesI, _thunkAPI) => {
    const response = await userLogin(data)
    return response
})
export const registerOperation = createAsyncThunk('user/register', async (data: FormValuesI, _thunkAPI) => {
    const response = await userRegister(data)
    return response
})
export const getMeOperation = createAsyncThunk('user/getMe', async (_data, _thunkAPI) => {
    const response = await userGetMe()
    return response
})
