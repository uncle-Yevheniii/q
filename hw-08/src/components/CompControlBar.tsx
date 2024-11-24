import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import Link from './ui/Link'
import AuthFunction from './ui/AuthFunction'
import DarkModeSwitch from './ui/DarkModeSwitch'
import AuthNavigation from './ui/AuthNavigation'
import NotAuthNavigation from './ui/NotAuthNavigation'
import { RootState } from '../store/store'
import { useAppSelector } from '../store/hook'

export default function ControlBar(): JSX.Element {
    const isAuth = useAppSelector((state: RootState) => state.user.isAuth)

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" gap="5rem">
                    <Typography
                        variant="h6"
                        component="p"
                        children={<Link to="/" children="ExhibitsBlog" sx={{ color: 'white' }} />}
                    />

                    {isAuth ? <AuthFunction /> : null}
                </Box>

                <Box display="flex" alignItems="center">
                    <DarkModeSwitch />

                    <Box sx={{ display: 'flex', gap: '3rem' }}>
                        {isAuth ? <AuthNavigation /> : <NotAuthNavigation />}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
