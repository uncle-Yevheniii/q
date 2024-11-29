import { useAppSelector } from '@/app/lib/hooks'
import { RootState } from '@/app/lib/store'
import { useEffect, useState } from 'react'

export function useUser() {
    const userId = useAppSelector((state: RootState) => state.user.user?.userId || null)
    const userName = useAppSelector((state: RootState) => state.user.user?.userName || null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return { userId, userName, isClient }
}
