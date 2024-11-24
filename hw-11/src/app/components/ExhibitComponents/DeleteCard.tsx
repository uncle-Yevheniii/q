'use client'

import { useUser } from '@/hooks/useUser'
import { Button } from '@mui/material'
import { Trash2 } from 'lucide-react'

export default function DeleteCard({ creator }: { creator: string }) {
    const { userName, isClient } = useUser()

    if (!isClient || !userName) return null

    return (
        <>
            {creator === userName && (
                <Button endIcon={<Trash2 />} color="error" size="small">
                    Delete
                </Button>
            )}
        </>
    )
}
