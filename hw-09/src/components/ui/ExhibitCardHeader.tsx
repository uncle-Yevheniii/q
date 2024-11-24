//
import { Avatar, Button, CardHeader } from '@mui/material'

import type { ExhibitCardHeaderProps } from '../../types/propsTypes'

export default function ExhibitCardHeader({
    subheader,
    username,
    isCreator,
    handleOpen,
    loadingComments
}: ExhibitCardHeaderProps): JSX.Element {
    return (
        <CardHeader
            avatar={<Avatar aria-label="recipe" variant="rounded" children={username[0].toUpperCase()} />}
            title={username}
            subheader={subheader}
            action={
                isCreator && (
                    <Button
                        disabled={loadingComments}
                        onClick={handleOpen}
                        size="small"
                        variant="text"
                        color="error"
                        children="Delete"
                    />
                )
            }
        />
    )
}
