import { Typography } from '@mui/material'

import { Link } from '.'
import { FormRedirectProps } from '../../types/propsTypes'

export default function FormRedirect({ to, label, linkLabel }: FormRedirectProps): JSX.Element {
    return (
        <Typography variant="subtitle1" component="p" sx={{ m: 1 }}>
            {`${label} `}
            <Link to={to} children={linkLabel} />
        </Typography>
    )
}
