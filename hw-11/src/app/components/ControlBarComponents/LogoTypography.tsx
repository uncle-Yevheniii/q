import { Typography } from '@mui/material'
import UniversalLink from '../UniversalLink'

export default function LogoTypography() {
    return (
        <UniversalLink href="/" underline="hover">
            <Typography
                variant="body2"
                component="span"
                letterSpacing="-0.15rem"
                fontFamily="var(--font-geist-mono)"
                fontStyle="italic"
            >
                next.js{' '}
            </Typography>
            <Typography variant="h6" component="span">
                ExhibitsBlog
            </Typography>
        </UniversalLink>
    )
}
