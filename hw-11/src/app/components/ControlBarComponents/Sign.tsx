'use client'

import { Typography } from '@mui/material'
import UniversalLink from '../UniversalLink'

export default function Sign() {
    return (
        <>
            <UniversalLink href="/login" underline="hover">
                <Typography variant="h6" component="span">
                    Login
                </Typography>
            </UniversalLink>

            <UniversalLink href="/register" underline="hover">
                <Typography variant="h6" component="span">
                    Register
                </Typography>
            </UniversalLink>
        </>
    )
}
