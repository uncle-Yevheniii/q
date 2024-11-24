import { List, ListItem, Alert } from '@mui/material'

import CommentsCard from './CommentsItem'
import { formatDateTime } from '../../helpers/formatDateTime'

import type { CommentI } from '../../types/types'

interface CommentsListProps {
    postID: number
    data: CommentI[]
}

export default function CommentsList({ data, postID }: CommentsListProps): JSX.Element {
    return (
        <>
            {data.length === 0 ? (
                <Alert severity="info" variant="filled" children="No comments yet." />
            ) : (
                <List sx={{ p: 2, maxHeight: 'calc(100vh - 96px - 64px)' }}>
                    {data.map((i) => (
                        <ListItem key={i.id}>
                            <CommentsCard
                                commentID={i.id}
                                postID={postID}
                                comment={i.text}
                                createdAt={formatDateTime(i.createdAt)}
                                username={i.user.username}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    )
}
