import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { SquareChevronDown } from 'lucide-react'
import RecordComment from './RecordComment'

export default function CommentAccordion({ commentCount, children }: { commentCount: number; children: JSX.Element }) {
    return (
        <Accordion variant="outlined">
            <AccordionSummary expandIcon={<SquareChevronDown />} aria-controls="panel1-content" id="panel1-header">
                <Typography fontFamily="var(--font-geist-mono)">{`Comment count: ${commentCount}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    )
}
