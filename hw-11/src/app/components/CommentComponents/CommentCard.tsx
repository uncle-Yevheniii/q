import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import type { CommentResponse } from '@/types/typeResponse'
import { formatDateTime } from '@/helpers/formatDateTime'
import { getRandomColor } from '@/helpers/getRandomColor'
import DeleteComment from './DeleteComment'

interface CommentCardI extends CommentResponse {
    exhibitID: number
}

export default function CommentCard({ id, exhibitID, text, createdAt, user }: CommentCardI) {
    const formattedDate = formatDateTime(createdAt)
    const randomColor = getRandomColor()
    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" sx={{ bgcolor: randomColor }} variant="rounded">
                        {user.username.toLocaleUpperCase()[0]}
                    </Avatar>
                }
                action={<DeleteComment creator={user.username} commentID={id} exhibitID={exhibitID} />}
                title={user.username}
                subheader={formattedDate}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}
