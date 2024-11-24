import { useEffect, useState } from 'react'
import { RootState } from '@/app/lib/store'
import { useAppSelector } from '@/app/lib/hooks'

export function useAuth() {
    const userAuth = useAppSelector((state: RootState) => state.user.userAuth)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    return { token, userAuth }
}
