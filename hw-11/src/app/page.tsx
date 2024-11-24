import { getAllExhibits } from '@/api/apiExhibitActions'
import Paging from './components/ExhibitComponents/Paging'
import { Alert, Box, List, ListItem } from '@mui/material'
import ExhibitCard from './components/ExhibitComponents/ExhibitCard'
import BottomBar from './components/ControlBarComponents/BottomBar'

interface searchParamsProp {
    query?: string
    page?: string
    limit?: string
}

export default async function Page(props: { searchParams?: Readonly<Promise<searchParamsProp>> }) {
    const searchParams = await props.searchParams
    const currentPage = Number(searchParams?.page) || 1

    const { data, lastPage } = await getAllExhibits(currentPage)

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="calc(100% - 128px)"
            overflow="overlay"
        >
            {data.length > 0 ? (
                <List component="ul" sx={{ height: '100%' }}>
                    {data.map((i) => (
                        <ListItem component="li" key={i.id}>
                            <ExhibitCard {...i} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Alert severity="info" variant="outlined">
                    No exhibit yet
                </Alert>
            )}

            <BottomBar>
                <Paging last={lastPage} />
            </BottomBar>
        </Box>
    )
}
