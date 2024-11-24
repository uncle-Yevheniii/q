import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface PaginationI {
    page: number
    dataLength: number
    setPage: (page: number) => void
}

export default function Pagination({ page, setPage, dataLength }: PaginationI): JSX.Element {
    const increment = () => setPage(page + 1)
    const decrement = () => setPage(page - 1)

    return (
        <AppBar
            position="absolute"
            component="footer"
            sx={{ top: 'calc(100% - 64px)' }}
            color="transparent"
            elevation={0}
        >
            <Toolbar>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={decrement}
                    disabled={page === 1}
                    fullWidth
                >
                    previous page
                </Button>

                <Typography variant="h6" component="p" align="center" sx={{ px: '2rem' }} children={page} />

                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={increment}
                    disabled={dataLength < 5}
                    fullWidth
                >
                    next page
                </Button>
            </Toolbar>
        </AppBar>
    )
}
