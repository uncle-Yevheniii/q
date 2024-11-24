import { Avatar, Button, CardHeader } from '@mui/material'

export interface CommentsCardHeaderProps {
    username: string
    createdAt: string
    loading: boolean
    isCreator: boolean
    handleDelete: () => void
}
export default function CommentsCardHeader({
    isCreator,
    username,
    loading,
    createdAt,
    handleDelete
}: CommentsCardHeaderProps): JSX.Element {
    return (
        <CardHeader
            avatar={
                <Avatar aria-label="recipe" variant="rounded">
                    {username[0].toUpperCase()}
                </Avatar>
            }
            action={
                isCreator && (
                    <Button
                        disabled={loading}
                        onClick={handleDelete}
                        variant="text"
                        children="Delete comment"
                        color="error"
                    />
                )
            }
            title={username}
            subheader={createdAt}
        />
    )
}
