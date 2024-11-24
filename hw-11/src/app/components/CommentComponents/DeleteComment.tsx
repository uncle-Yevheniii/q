'use client'

import { deleteComment } from '@/api/apiCommentActions'
import { useUser } from '@/hooks/useUser'
import { Button } from '@mui/material'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface DeleteCommentI {
    creator: string
    commentID: number
    exhibitID: number
    refreshAsync?: () => void
}

export default function DeleteComment({ creator, commentID, exhibitID, refreshAsync }: DeleteCommentI) {
    const router = useRouter()
    const { userName, isClient } = useUser()
    if (!isClient || !userName) return null

    const handleDelete = () => {
        toast.promise(deleteComment(exhibitID, commentID), {
            loading: 'Delete comment...',
            success: () => {
                refreshAsync?.()
                router.refresh()
                return 'Comment delete successfully'
            },
            error: (error) => {
                console.error('Failed to delete comment:', error.message)
                return 'Failed to delete comment'
            }
        })
    }

    return (
        <>
            {creator === userName && (
                <Button onClick={handleDelete} endIcon={<Trash2 />} color="error" size="small">
                    Delete
                </Button>
            )}
        </>
    )
}
