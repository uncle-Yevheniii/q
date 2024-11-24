import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import { UI } from './components'
import { useAppSelector } from './store/hook'
import { CustomThemeProvider } from './CustomThemeProvider'
import { ProtectedRoute, RestrictedRoute } from './helpers/routeHelper'
import { HomePage, LoginPage, NewPostPage, RegisterPage, StipePage, LayoutWrapper } from './layouts'
import useNotify from './hooks/useNotify'

export default function App(): JSX.Element {
    const userLoading = useAppSelector((state) => state.user.userLoading)

    useNotify()

    if (userLoading) return <UI.UserLoading />
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
