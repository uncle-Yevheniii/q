import { AppBar, Toolbar } from '@mui/material'

export default function BottomBar({ children }: { children: React.ReactNode }) {
    return (
        <AppBar position="absolute" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>{children}</Toolbar>
        </AppBar>
    )
}
