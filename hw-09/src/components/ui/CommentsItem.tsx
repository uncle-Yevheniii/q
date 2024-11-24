import { useRequest } from 'ahooks'
import { toast } from 'react-hot-toast'
import { Card, CardContent, Typography } from '@mui/material'

import { CommentsCardHeader } from '.'
import { RootState } from '../../store/store'
import { useAppSelector } from '../../store/hook'
import { deleteComment } from '../../api/apiCommentActions'
import type { CommentsCardProps } from '../../types/propsTypes'

export default function CommentsCard({
    comment,
    createdAt,
    username,
    commentID,
    postID,
    refreshAsync,
    decrementComment
}: CommentsCardProps): JSX.Element {
    const user = useAppSelector((state: RootState) => state.user.user.username)
    const { loading, runAsync } = useRequest(deleteComment, {
        manual: true
    })

    const handleDelete = () =>
        toast.promise(runAsync(postID, commentID), {
            loading: 'Delete comment...',
            success: () => {
                decrementComment()
                refreshAsync()
                return 'Comment delete successfully'
            },
            error: (error) => {
                console.error('Failed to write comment:', error.message)
                return 'Failed to delete comment'
            }
        })

    return (
        <Card sx={{ width: '100%', p: 0 }}>
            <CardContent sx={{ p: 0 }}>
                <CommentsCardHeader
                    loading={loading}
                    username={username}
                    createdAt={createdAt}
                    isCreator={username === user}
                    handleDelete={handleDelete}
                />
                <Typography variant="body2" component="p" color="text.secondary" children={comment} margin={3} />
            </CardContent>
        </Card>
    )
}
