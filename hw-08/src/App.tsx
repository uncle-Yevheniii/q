import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import UserLoading from './components/ui/UserLoading'
import { getMeOperation } from './store/slices/userSlice'
import { CustomThemeProvider } from './CustomThemeProvider'
import { useAppDispatch, useAppSelector } from './store/hook'
import { ProtectedRoute, RestrictedRoute } from './helpers/routeHelper'
import { HomePage, LoginPage, NewPostPage, RegisterPage, StipePage, LayoutWrapper } from './layouts'

export default function App(): JSX.Element {
    const dispatch = useAppDispatch()
    const userLoading = useAppSelector((state) => state.user.userLoading)

    useEffect(() => {
        if (localStorage.getItem('token') !== null || '') dispatch(getMeOperation())
    }, [dispatch])

    if (userLoading) return <UserLoading />
    return (
        <CustomThemeProvider>
            <Routes>
                <Route path="/" element={<LayoutWrapper />}>
                    <Route index element={<StipePage />} />

                    <Route path="/login" element={<RestrictedRoute children={<LoginPage />} />} />
                    <Route path="/register" element={<RestrictedRoute children={<RegisterPage />} />} />

                    <Route path="/home" element={<ProtectedRoute children={<HomePage />} />} />
                    <Route path="/new-post" element={<ProtectedRoute children={<NewPostPage />} />} />

                    <Route path="*" element={<Navigate to="/home" />} />
                </Route>
            </Routes>

            <Toaster />
        </CustomThemeProvider>
    )
}
