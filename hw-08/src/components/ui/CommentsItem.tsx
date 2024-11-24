import { Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useAppSelector } from '../../store/hook'
import { RootState } from '../../store/store'
import toast from 'react-hot-toast'
import { useRequest } from 'ahooks'
import { deleteComment } from '../../api/apiCommentActions'
import { useNavigate } from 'react-router-dom'

interface CommentsCardProps {
    commentID: number
    postID: number
    comment: string
    createdAt: string
    username: string
}

export default function CommentsCard({
    comment,
    createdAt,
    username,
    commentID,
    postID
}: CommentsCardProps): JSX.Element {
    const user = useAppSelector((state: RootState) => state.user.user.username)
    const navigate = useNavigate()
    const { loading, runAsync } = useRequest(deleteComment, { manual: true })

    const handleDelete = () =>
        toast.promise(runAsync(postID, commentID), {
            loading: 'Delete comment...',
            success: () => {
                navigate(0)
                return 'Comment delete successfully'
            },
            error: (error) => {
                console.error('Failed to write comment:', error.message)
                return 'Failed to delete comment'
            }
        })

    return (
        <Card sx={{ p: 2, width: '100%' }}>
            <CardContent>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" variant="rounded">
                            {username[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        user === username && (
                            <Button
                                disabled={loading}
                                onClick={handleDelete}
                                variant="text"
                                children="Delete comment"
                                color="error"
                            />
                        )
                    }
                    title={username}
                    subheader={createdAt}
                />
                <Typography variant="body2" component="p" color="text.secondary" children={comment} margin={3} />
            </CardContent>
        </Card>
    )
}
