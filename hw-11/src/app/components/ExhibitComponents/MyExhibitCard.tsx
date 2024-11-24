'use client'

import { formatDateTime } from '@/helpers/formatDateTime'
import { getRandomColor } from '@/helpers/getRandomColor'
import { ExhibitI } from '@/types/typeResponse'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import Image from 'next/image'
import DeleteCard from './DeleteCard'
import CommentAccordion from '../CommentComponents/CommentAccordion'
import MyCommentList from '../CommentComponents/MyCommentList'
import RecordComment from '../CommentComponents/RecordComment'
import { useRequest } from 'ahooks'
import { getAllComments } from '@/api/apiCommentActions'

interface MyExhibitCardI extends ExhibitI {
    loading?: boolean
    error?: Error | undefined
    refreshAsyncTotal?: () => void
}

export default function MyExhibitCard({
    id,
    description,
    imageUrl,
    createdAt,
    user,
    commentCount,
    refreshAsyncTotal
}: MyExhibitCardI) {
    const fullImageUrl = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com' + imageUrl
    const formattedDate = formatDateTime(createdAt)
    const randomColor = getRandomColor()

    const { data, refreshAsync } = useRequest(() => getAllComments(id))
    const myCommentList = data || []

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
                    <RecordComment exhibitID={id} refreshAsyncTotal={refreshAsyncTotal} refreshAsync={refreshAsync}>
                        <MyCommentList data={myCommentList} exhibitID={id} refreshAsync={refreshAsync} />
                    </RecordComment>
                </>
            </CommentAccordion>
        </Card>
    )
}
