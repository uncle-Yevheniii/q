//
import { Alert, CardContent, List, ListItem } from '@mui/material'

import { CommentsItem } from '.'
import { formatDateTime } from '../../helpers/formatDateTime'
import type { CommentsListProps } from '../../types/propsTypes'

export default function ExhibitCardExpandMoreContent({
    data,
    postID,
    refreshAsync,
    decrementComment
}: CommentsListProps): JSX.Element {
    return (
        <CardContent>
            {data.length === 0 ? (
                <Alert severity="info" variant="filled" children="No comments yet." />
            ) : (
                <List sx={{ overflow: 'auto', p: 0 }}>
                    {data.map((i: any) => (
                        <ListItem key={i.id}>
                            <CommentsItem
                                decrementComment={decrementComment}
                                refreshAsync={refreshAsync}
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
        </CardContent>
    )
}
