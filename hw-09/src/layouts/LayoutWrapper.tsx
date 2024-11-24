import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { ControlBar } from '../components'

export default function LayoutWrapper(): JSX.Element {
    return (
        <>
            <Box>
                <ControlBar />
            </Box>

            <Box
                component="main"
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'calc(100vh - 96px - 64px)',
                    overflow: 'overlay'
                }}
            >
                <Outlet />
            </Box>
        </>
    )
}
