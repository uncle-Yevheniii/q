import { Button, Typography } from '@mui/material'

import { RootState } from '../../store/store'
import { logout } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hook'

export default function AuthNavigation(): JSX.Element {
    const dispatch = useAppDispatch()
    const username = useAppSelector((state: RootState) => state.user.user.username)
    const usernameEdit = username.length > 10 ? username.slice(0, 10) + '...' : username

    const handleLogout = () => dispatch(logout())

    return (
        <>
            <Typography variant="h6" component="p" sx={{ width: '200px', fontSize: '13px' }} align="center">
                Welcome back,{' '}
                <Typography
                    variant="h6"
                    align="center"
                    component="span"
                    sx={{ fontWeight: 800 }}
                    children={usernameEdit}
                />
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}
