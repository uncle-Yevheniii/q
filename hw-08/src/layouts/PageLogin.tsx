import { Box, Typography } from '@mui/material'

import { LoginForm } from '../components'

export default function LoginPage(): JSX.Element {
    return (
        <Box component="section" sx={{ p: 2, width: '40rem' }}>
            <Typography align="center" variant="h3" component="p" children="Welcome back" />

            <LoginForm />
        </Box>
    )
}
