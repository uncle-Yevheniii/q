import NextLink from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

interface UniversalLinkProps extends MuiLinkProps {
    href: string
}

export default function UniversalLink({ href, ...props }: UniversalLinkProps) {
    return <MuiLink component={NextLink} href={href} {...props} />
}
