import { useRequest } from 'ahooks'
import { Alert, CardContent, CircularProgress, Typography } from '@mui/material'

import CommentsList from './ui/CommentsList'
import { getAllComments } from '../api/apiCommentActions'

export default function CommentStripe({ postID }: { postID: number }): JSX.Element {
    const { data, error, loading } = useRequest(() => getAllComments(postID), {
        refreshDeps: [postID]
    })

    if (loading) return <CircularProgress size={80} />
    if (error) return <Alert severity="error">{`${error.message}! Try reload page.`}</Alert>
    return (
        <CardContent>
            <Typography gutterBottom variant="h4" component="p" children="Post comments:" />
            <CommentsList data={data || []} postID={postID} />
        </CardContent>
    )
}
