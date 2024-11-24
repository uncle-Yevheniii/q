import { useState } from 'react'
import { Card, CardMedia, CardContent, Typography, CardHeader, Avatar } from '@mui/material'

import Modal from './Modal'
import Comment from '../CompComment'
import ExhibitButton from './ExhibitButton'
import ExhibitDelete from './ExhibitDelete'
import CommentStripe from '../CompCommentStripe'

import { useAuth } from '../../hooks/useAuth'

interface ExhibitCardProps {
    imgUrl: string
    description: string
    username: string
    postID: number
    userCreator: string
    createdAt: string
}

export default function ExhibitCard({
    imgUrl,
    description,
    username,
    postID,
    userCreator,
    createdAt
}: ExhibitCardProps): JSX.Element {
    const imgLink: string = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com' + imgUrl
    const [open, setModal] = useState<boolean>(false)
    const [currentButton, setCurrentButton] = useState<string>('')
    const handleClose = () => setModal(!open)

    const { isAuthenticated, getToken } = useAuth()

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentButton(e.currentTarget.textContent || '')
        setModal(!open)
    }

    return (
        <Card sx={{ p: 2, width: '800px' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" variant="rounded">
                        {username[0].toUpperCase()}
                    </Avatar>
                }
                title={username}
                subheader={createdAt}
            />
            <CardMedia component="img" height={400} image={imgLink} alt="green iguana" />
            <CardContent>
                <Typography variant="body2" component="p" color="text.secondary" children={description} mb={2} />
            </CardContent>

            {getToken && isAuthenticated ? <Comment postID={postID} /> : null}

            <ExhibitButton userCreator={userCreator} handleOpen={handleOpen} />

            <Modal open={open} handleClose={handleClose}>
                {currentButton === 'Comments' ? <CommentStripe postID={postID} /> : <ExhibitDelete postID={postID} />}
            </Modal>
        </Card>
    )
}
