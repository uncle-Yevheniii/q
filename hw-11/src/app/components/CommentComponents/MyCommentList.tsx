'use client'

import { Alert, List, ListItem } from '@mui/material'
import MyCommentCard from './MyCommentCard'
import { CommentResponse } from '@/types/typeResponse'

interface MyCommentListI {
    data: Array<CommentResponse>
    exhibitID: number
    refreshAsync?: () => void
}

export default function MyCommentList({ data, exhibitID, refreshAsync }: MyCommentListI) {
    return (
        <>
            {data.length > 0 ? (
                <List component="ul" sx={{ maxHeight: '20rem', overflow: 'overlay' }}>
                    {data.map((i) => (
                        <ListItem key={i.id} component="li">
                            <MyCommentCard {...i} exhibitID={exhibitID} refreshAsync={refreshAsync} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Alert severity="info" variant="outlined">
                    No comments yet
                </Alert>
            )}
        </>
    )
}
