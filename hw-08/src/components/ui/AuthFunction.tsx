import { Box, Typography } from '@mui/material'

import Link from './Link'

export default function AuthFunction(): JSX.Element {
    return (
        <Box display="flex" alignItems="center" gap="1rem">
            <Typography
                variant="h6"
                component="p"
                children={
                    <Link
                        to="/home"
                        children="My posts"
                        sx={{ color: 'white', p: 1, border: '1px solid white', borderRadius: '5px' }}
                    />
                }
            />

            <Typography
                variant="h6"
                component="p"
                children={
                    <Link
                        to="/new-post"
                        children="Create post"
                        sx={{ color: 'white', p: 1, border: '1px solid white', borderRadius: '5px' }}
                    />
                }
            />
        </Box>
    )
}
