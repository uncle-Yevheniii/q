import { Box, LinearProgress } from '@mui/material'

export default function UserLoading(): JSX.Element {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}
