import { userGetMe } from '@/api/apiUserActions'
import { setAuthToken } from '@/api/httpClient'

interface UserState {
    user: { userId: number | null; userName: string; access_token: string; refresh_token: string }
    loading: boolean
    error: boolean
    userAuth: boolean
    userLoading: boolean
}

export async function getInitialState(): Promise<UserState> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
        setAuthToken(token)

        const user = await userGetMe()
        return {
            user: {
                userId: user.id,
                userName: user.username,
                access_token: token,
                refresh_token: ''
            },
            loading: false,
            error: false,

            userAuth: true,
            userLoading: false
        }
    }

    return {
        user: {
            userId: null,
            userName: '',
            access_token: '',
            refresh_token: ''
        },
        loading: false,
        error: false,

        userAuth: false,
        userLoading: false
    }
}
