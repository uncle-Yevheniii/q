import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
    const { isAuthenticated, getToken } = useAuth()

    if (!getToken || !isAuthenticated) return <Navigate to="/login" />

    return children
}

export function RestrictedRoute({ children }: { children: JSX.Element }): JSX.Element {
    const { isAuthenticated, getToken } = useAuth()

    if (getToken && isAuthenticated) return <Navigate to="/home" />

    return children
}
