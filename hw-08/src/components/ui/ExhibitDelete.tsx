import { toast } from 'react-hot-toast'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { Button, CardContent, CircularProgress, Typography } from '@mui/material'

import { deleteExhibit } from '../../api/apiExhibitActions'

export default function ExhibitDelete({ postID }: { postID: number }): JSX.Element {
    const navigate = useNavigate()

    const { loading, runAsync } = useRequest(deleteExhibit, { manual: true })

    const handleSubmit = () =>
        toast.promise(runAsync(postID), {
            loading: 'Deleting post...',
            success: () => {
                navigate(0)
                return 'Post deleted successfully'
            },
            error: (error) => {
                console.error('Failed to register:', error.message)
                return 'Failed to delete post'
            }
        })

    if (loading) return <CircularProgress size={80} />

    return (
        <CardContent component="div" content="center">
            <Typography
                component="p"
                align="center"
                variant="h5"
                margin={1}
                children="Do you really want to delete the post?"
            />

            <Button onClick={handleSubmit} variant="contained" color="error" fullWidth>
                Delete
            </Button>
        </CardContent>
    )
}
