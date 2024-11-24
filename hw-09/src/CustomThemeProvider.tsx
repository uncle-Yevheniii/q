import { ReactNode, useEffect } from 'react'
import { createTheme, Paper, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import { RootState } from './store/store'
import { setTheme } from './store/slices/themeSlice'
import { useAppDispatch, useAppSelector } from './store/hook'

export function CustomThemeProvider({ children }: { children: ReactNode }): JSX.Element {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector((state: RootState) => state.theme.mode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        if (themeMode === 'light' && prefersDarkMode) dispatch(setTheme('dark'))
    }, [themeMode, prefersDarkMode, dispatch])

    const appTheme = createTheme({
        palette: { mode: themeMode }
    })
    return (
        <MuiThemeProvider theme={appTheme}>
            <Paper elevation={0} sx={{ height: '100vh' }} square>
                {children}
            </Paper>
        </MuiThemeProvider>
    )
}
