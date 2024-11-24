import { Box, Typography } from '@mui/material'

import { Post } from '../components'

export default function NewPostPage() {
    return (
        <Box component="section" sx={{ p: 2, width: '40rem' }}>
            <Typography align="center" variant="h3" component="p" children="Create new post" />

            <Post />
        </Box>
    )
}
