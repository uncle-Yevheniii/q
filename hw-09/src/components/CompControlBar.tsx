import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { UI } from '.'
import { RootState } from '../store/store'
import { useAppSelector } from '../store/hook'

export default function ControlBar(): JSX.Element {
    const isAuth = useAppSelector((state: RootState) => state.user.isAuth)

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" gap="5rem">
                    <Typography
                        variant="h6"
                        component="p"
                        children={<UI.Link to="/" children="ExhibitsBlog" sx={{ color: 'white' }} />}
                    />

                    {isAuth ? <UI.AuthFunction /> : null}
                </Box>

                <Box display="flex" alignItems="center">
                    <UI.DarkModeSwitch />

                    <Box sx={{ display: 'flex', gap: '3rem' }}>
                        {isAuth ? <UI.AuthNavigation /> : <UI.NotAuthNavigation />}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
