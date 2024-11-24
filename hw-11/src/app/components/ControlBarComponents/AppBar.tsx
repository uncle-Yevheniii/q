'use client'

import { Box, AppBar, Toolbar } from '@mui/material'

import Sign from './Sign'
import UserMenu from './UserMenu'
import LogoTypography from './LogoTypography'
import UserPostsActions from './UserExhibitActions'
import { useAuth } from '@/hooks/useAuth'

export default function AppBarComp() {
    const token = useAuth()?.token
    const userAuth = useAuth()?.userAuth

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" gap={15} component="div">
                    <LogoTypography />

                    <Box display="flex" gap={1} component="div">
                        {token && userAuth ? <UserPostsActions /> : null}
                    </Box>
                </Box>

                <Box display="flex" gap={2} component="div">
                    {token && userAuth ? <UserMenu /> : <Sign />}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
