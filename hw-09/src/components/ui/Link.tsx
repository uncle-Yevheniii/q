import { Link as MuiLink } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'

import type { CombinedLinkProps } from '../../types/propsTypes'

export default function Link(props: CombinedLinkProps): JSX.Element {
    return (
        <MuiLink {...props} component={ReactRouterLink} to={props.to ?? '#'}>
            {props.children}
        </MuiLink>
    )
}
