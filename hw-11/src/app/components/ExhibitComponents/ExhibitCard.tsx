import { formatDateTime } from '@/helpers/formatDateTime'
import { getRandomColor } from '@/helpers/getRandomColor'
import { ExhibitI } from '@/types/typeResponse'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'
import DeleteCard from './DeleteCard'
import CommentAccordion from '../CommentComponents/CommentAccordion'
import CommentList from '../CommentComponents/CommentList'
import RecordComment from '../CommentComponents/RecordComment'

export default function ExhibitCard({ id, description, imageUrl, createdAt, user, commentCount }: ExhibitI) {
    const fullImageUrl = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com' + imageUrl
    const formattedDate = formatDateTime(createdAt)
    const randomColor = getRandomColor()
    return (
        <Card sx={{ width: '35rem', bgcolor: 'rgba(255, 255, 255, 0.01)' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" sx={{ bgcolor: randomColor }} variant="rounded">
                        {user.username.toLocaleUpperCase()[0]}
                    </Avatar>
                }
                action={<DeleteCard creator={user.username} />}
                title={user.username}
                subheader={formattedDate}
            />

            <CardMedia sx={{ bgcolor: '#121212' }}>
                <Image src={fullImageUrl} alt="Exhibit" width={300} height={300} priority />
            </CardMedia>

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>

            <CommentAccordion commentCount={commentCount}>
                <>
                    <RecordComment exhibitID={id} />
                    <CommentList exhibitID={id} />
                </>
            </CommentAccordion>
        </Card>
    )
}
