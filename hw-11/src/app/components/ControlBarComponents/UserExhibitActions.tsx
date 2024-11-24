'use client'

import { Button, Typography } from '@mui/material'
import UniversalLink from '../UniversalLink'
import { House, ImagePlus } from 'lucide-react'

export default function UserPostsActions() {
    return (
        <>
            <Button component={UniversalLink} href="/my-exhibits" startIcon={<House />}>
                <Typography component="span" variant="body2">
                    My Exhibits
                </Typography>
            </Button>
            <Button component={UniversalLink} href="/create-exhibit" startIcon={<ImagePlus />}>
                <Typography component="span" variant="body2">
                    Create Exhibit
                </Typography>
            </Button>
        </>
    )
}
