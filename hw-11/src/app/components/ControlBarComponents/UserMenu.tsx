'use client'

import { Button, Typography } from '@mui/material'

import { logout } from '@/app/lib/features/user/userSlice'
import { useAppDispatch } from '@/app/lib/hooks'
import { LogOut } from 'lucide-react'
import { useUser } from '@/hooks/useUser'

export default function UserMenu() {
    const dispatch = useAppDispatch()
    const { userName } = useUser()
    const usernameEdit = userName && userName.length > 10 ? userName.slice(0, 10) + '...' : userName || ''

    const handleLogout = () => dispatch(logout())

    return (
        <>
            <Typography variant="h6" component="p" sx={{ width: '200px', fontSize: '13px' }} align="center">
                Welcome back,{' '}
                <Typography variant="h6" align="center" component="span" sx={{ fontWeight: 800 }}>
                    {usernameEdit}
                </Typography>
            </Typography>

            <Button variant="outlined" onClick={handleLogout} endIcon={<LogOut />}>
                Logout
            </Button>
        </>
    )
}
