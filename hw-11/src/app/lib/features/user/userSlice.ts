import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from './getInitialState'
import { removeAuthToken, setAuthToken } from '@/api/httpClient'
import { loginOperation } from './userOperations'

function saveToken(token: string): void {
    localStorage.setItem('token', token)
    setAuthToken(token)
}
function removeToken(): void {
    localStorage.removeItem('token')
    removeAuthToken()
}

const userSlice = createSlice({
    name: 'user',
    initialState: await getInitialState(),
    reducers: {
        logout(state) {
            state.user = { userId: null, userName: '', access_token: '', refresh_token: '' }
            state.userAuth = false
            removeToken()
        }
    },
    extraReducers(builder) {
        builder.addCase(loginOperation.fulfilled, (state, action) => {
            state.loading = false
            state.userAuth = true

            state.user.userName = action.payload.userName
            state.user.access_token = action.payload.access_token

            saveToken(action.payload.access_token)
        })
    }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
