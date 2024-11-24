import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FormValuesI, InitialStateI } from '../../types/types'
import { userGetMe, userLogin, userRegister } from '../../api/apiUserActions'

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

const getKeyValues = (): string | null => (localStorage.getItem('token') ? localStorage.getItem('token') : null)

const initialState: InitialStateI = {
    user: {
        id: null,
        username: '',
        access_token: '',
        key: getKeyValues()
    },

    isAuth: false,
    loading: false,
    userLoading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user.id = null
            state.user.username = ''
            state.user.access_token = ''
            state.user.key = null
            state.isAuth = false
            localStorage.removeItem('token')
        }
    },
    extraReducers(builder) {
        builder.addCase(loginOperation.pending, (state, _action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(loginOperation.fulfilled, (state, action) => {
            state.loading = false
            state.isAuth = true

            state.user.username = action.payload.userName
            state.user.access_token = action.payload.access_token
            state.user.key = action.payload.access_token
            localStorage.setItem('token', action.payload.access_token)
        })
        builder.addCase(loginOperation.rejected, (state, _action) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(registerOperation.pending, (state, _action) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(registerOperation.fulfilled, (state, _action) => {
            state.loading = false
        })
        builder.addCase(registerOperation.rejected, (state, _action) => {
            state.loading = false
            state.error = true
        })

        builder.addCase(getMeOperation.pending, (state, _action) => {
            state.userLoading = true
            state.error = false
        })
        builder.addCase(getMeOperation.fulfilled, (state, action) => {
            state.userLoading = false
            state.isAuth = true
            state.user.username = action.payload.username
            state.user.id = action.payload.id
        })
        builder.addCase(getMeOperation.rejected, (state, _action) => {
            state.userLoading = false
            state.error = true
        })
    }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
