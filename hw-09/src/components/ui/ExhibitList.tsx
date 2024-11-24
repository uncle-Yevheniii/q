//
import { List, ListItem } from '@mui/material'

import { ExhibitCard } from '.'
import { formatDateTime } from '../../helpers/formatDateTime'
import type { ExhibitI } from '../../types/types'

interface ExhibitListProps {
    data: ExhibitI[]
}

export default function ExhibitList({ data }: ExhibitListProps): JSX.Element {
    return (
        <List sx={{ p: 2, maxHeight: 'calc(100vh - 96px - 64px)' }}>
            {data.map((i) => (
                <ListItem key={i.id}>
                    <ExhibitCard
                        postID={i.id}
                        imgUrl={i.imageUrl}
                        createdAt={formatDateTime(i.createdAt)}
                        username={i.user.username}
                        description={i.description}
                        userCreator={i.user.username}
                        commentCount={i.commentCount}
                    />
                </ListItem>
            ))}
        </List>
    )
}
