import { RootState } from '../store/store'
import { useAppSelector } from '../store/hook'

export function useAuth(): { isAuthenticated: boolean; getToken: boolean } {
    const isAuthenticated = useAppSelector((state: RootState) => state.user.isAuth)
    const getToken = localStorage.getItem('token') !== null

    return { isAuthenticated, getToken }
}
