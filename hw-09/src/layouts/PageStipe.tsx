import { useState } from 'react'
import { useRequest } from 'ahooks'
import { CircularProgress, Alert } from '@mui/material'

import { Pagination, UI } from '../components'
import { getAllExhibits } from '../api/apiExhibitActions'

export default function StripePage() {
    const [page, setPage] = useState<number>(1)

    const { data, error, loading } = useRequest(() => getAllExhibits(page), {
        refreshDeps: [page]
    })

    if (loading) return <CircularProgress size={80} />
    if (error) return <Alert severity="error">{`${error.message}! Try reload page.`}</Alert>

    return (
        <>
            {data?.data && data.data.length > 0 ? (
                <UI.ExhibitList data={data?.data || []} />
            ) : (
                <Alert severity="info">It's still empty here 😢</Alert>
            )}
            <Pagination page={page} setPage={setPage} dataLength={data?.data.length || 0} />
        </>
    )
}
