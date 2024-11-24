import { Box, Typography } from '@mui/material'

import { RegisterForm } from '../components'

export default function RegisterPage() {
    return (
        <Box component="section" sx={{ p: 2, width: '40rem' }}>
            <Typography align="center" variant="h3" component="p" children="Create account" />

            <RegisterForm />
        </Box>
    )
}
