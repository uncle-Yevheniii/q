//
import { useRequest } from 'ahooks'
import { useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import { Card, CardMedia, CardContent, Typography, CardActions, Collapse } from '@mui/material'

import { Comment } from '..'
import { RootState } from '../../store/store'
import { useAuth } from '../../hooks/useAuth'
import { useAppSelector } from '../../store/hook'
import { getAllComments } from '../../api/apiCommentActions'
import { Modal, ExhibitDelete, ExhibitCardExpandMore, ExhibitCardHeader, ExhibitCardExpandMoreContent } from '.'
import type { ExhibitCardProps } from '../../types/propsTypes'

export default function ExhibitCard({
    imgUrl,
    description,
    username,
    postID,
    userCreator,
    createdAt,
    commentCount
}: ExhibitCardProps): JSX.Element {
    const imgLink: string = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com' + imgUrl
    const user = useAppSelector((state: RootState) => state.user.user.username)

    const [open, setModal] = useState<boolean>(false)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [commentCounter, setCommentCounter] = useState<number>(commentCount)

    const incrementComment = (): void => setCommentCounter(commentCounter + 1)
    const decrementComment = (): void => setCommentCounter(commentCounter - 1)
    const handleClose = () => setModal(!open)
    const handleOpen = (): void => setModal(!open)
    const handleExpandClick = async (): Promise<void> => {
        await runAsync(postID)
        setExpanded(!expanded)
    }

    const { isAuthenticated, getToken } = useAuth()
    const { loading, runAsync, data, refreshAsync } = useRequest(getAllComments, {
        manual: true
    })

    return (
        <Card sx={{ p: 2, width: '800px' }}>
            <ExhibitCardHeader
                subheader={createdAt}
                username={username}
                isCreator={user === userCreator}
                handleOpen={handleOpen}
                loadingComments={loading}
            />

            <CardMedia component="img" height={400} image={imgLink} alt="img-alt" />

            <CardContent>
                <Typography
                    variant="subtitle1"
                    component="p"
                    color="text"
                    children={description}
                    mb={2}
                    sx={{ fontStyle: 'italic' }}
                />
            </CardContent>

            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary" children={`Comments: ${commentCounter}`} />

                <ExhibitCardExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </ExhibitCardExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {getToken && isAuthenticated ? (
                    <Comment postID={postID} refreshAsync={refreshAsync} incrementComment={incrementComment} />
                ) : null}
                <ExhibitCardExpandMoreContent
                    data={data || []}
                    postID={postID}
                    refreshAsync={refreshAsync}
                    decrementComment={decrementComment}
                />
            </Collapse>

            <Modal open={open} handleClose={handleClose}>
                <ExhibitDelete postID={postID} />
            </Modal>
        </Card>
    )
}
