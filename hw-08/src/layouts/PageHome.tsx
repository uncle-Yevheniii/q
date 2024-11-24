import { useState } from 'react'
import { useRequest } from 'ahooks'
import { CircularProgress, Alert } from '@mui/material'

import ExhibitList from '../components/ui/ExhibitList'

import { Pagination } from '../components'
import { getAllMyExhibits } from '../api/apiExhibitActions'

export default function HomePage() {
    const [page, setPage] = useState<number>(1)

    const { data, error, loading } = useRequest(() => getAllMyExhibits(page), {
        refreshDeps: [page]
    })

    if (loading) return <CircularProgress size={80} />
    if (error) return <Alert severity="error">{`${error.message}! Try reload page.`}</Alert>

    return (
        <>
            {data?.data && data.data.length > 0 ? (
                <ExhibitList data={data?.data || []} />
            ) : (
                <Alert severity="info">It's still empty here 😢</Alert>
            )}
            <Pagination page={page} setPage={setPage} dataLength={data?.data.length || 0} />
        </>
    )
}
