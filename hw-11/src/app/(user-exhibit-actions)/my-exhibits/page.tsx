'use client'

import { useRequest } from 'ahooks'
import { useSearchParams } from 'next/navigation'
import { getAllMyExhibits } from '@/api/apiExhibitActions'
import { Alert, Box, List, ListItem } from '@mui/material'
import BottomBar from '@/app/components/ControlBarComponents/BottomBar'
import Paging from '@/app/components/ExhibitComponents/Paging'
import MyExhibitCard from '@/app/components/ExhibitComponents/MyExhibitCard'

export default function Page() {
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const { data, refreshAsync } = useRequest(() => getAllMyExhibits(currentPage), {
        refreshDeps: [currentPage]
    })
    const lastPage = data?.lastPage || 1
    const myExhibitList = data?.data || []

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="calc(100% - 128px)"
            overflow="overlay"
        >
            {myExhibitList.length > 0 ? (
                <List component="ul" sx={{ height: '100%' }}>
                    {myExhibitList.map((i) => (
                        <ListItem component="li" key={i.id}>
                            <MyExhibitCard {...i} refreshAsyncTotal={refreshAsync} />
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
