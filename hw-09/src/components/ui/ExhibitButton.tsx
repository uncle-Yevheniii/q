import { Button, CardActions } from '@mui/material'

import { RootState } from '../../store/store'
import { useAppSelector } from '../../store/hook'
import type { ExhibitButtonProps } from '../../types/propsTypes'

export default function ExhibitButton({ handleOpen, userCreator }: ExhibitButtonProps): JSX.Element {
    const username = useAppSelector((state: RootState) => state.user.user.username)

    return (
        <>
            <CardActions>
                <Button size="small" onClick={handleOpen}>
                    Comments
                </Button>

                {username === userCreator && (
                    <Button onClick={handleOpen} size="small">
                        Delete
                    </Button>
                )}
            </CardActions>
        </>
    )
}
