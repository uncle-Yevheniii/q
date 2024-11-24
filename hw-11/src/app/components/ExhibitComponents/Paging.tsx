'use client'

import { Avatar, Button } from '@mui/material'
import { usePathname, useSearchParams } from 'next/navigation'
import UniversalLink from '../UniversalLink'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

export default function Paging({ last }: { last: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <>
            <Button
                disabled={currentPage === 1}
                component={UniversalLink}
                href={createPageURL(currentPage - 1)}
                startIcon={<ArrowBigLeft />}
                variant="outlined"
                fullWidth
            >
                Prev
            </Button>

            <Avatar variant="rounded" sx={{ mx: '0.5rem', fontFamily: 'var(--font-geist-mono)' }}>
                {currentPage}
            </Avatar>

            <Button
                disabled={currentPage === last}
                component={UniversalLink}
                href={createPageURL(currentPage + 1)}
                endIcon={<ArrowBigRight />}
                variant="outlined"
                fullWidth
            >
                Next
            </Button>
        </>
    )
}
