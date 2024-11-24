import { Typography } from '@mui/material'

import Link from './Link'

interface FormRedirectProps {
    to: string
    label: string
    linkLabel: string
}

export default function FormRedirect({ to, label, linkLabel }: FormRedirectProps): JSX.Element {
    return (
        <Typography variant="subtitle1" component="p" sx={{ m: 1 }}>
            {`${label} `}
            <Link to={to} children={linkLabel} />
        </Typography>
    )
}
