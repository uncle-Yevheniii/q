import { Box, Switch } from '@mui/material'

import { RootState } from '../../store/store'
import { toggleTheme } from '../../store/slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../../store/hook'

export default function DarkModeSwitch(): JSX.Element {
    const dispatch = useAppDispatch()
    const themeState = useAppSelector((state: RootState) => state.theme.mode === 'dark')

    const handleChange = () => dispatch(toggleTheme())

    return (
        <Box sx={{ textAlign: 'center', fontSize: '13px' }}>
            Theme switch
            <Switch checked={themeState} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
        </Box>
    )
}
