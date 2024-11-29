import { getAllComments } from '@/api/apiCommentActions'
import { Alert, List, ListItem } from '@mui/material'
import CommentCard from './CommentCard'

export default async function CommentList({ exhibitID }: { exhibitID: number }) {
    const res = await getAllComments(exhibitID)
    return (
        <>
            {res.length > 0 ? (
                <List component="ul" sx={{ maxHeight: '20rem', overflow: 'overlay' }}>
                    {res.map((i) => (
                        <ListItem key={i.id} component="li">
                            <CommentCard exhibitID={exhibitID} {...i} />
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
