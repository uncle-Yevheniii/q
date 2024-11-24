import Link from './Link'

export default function NotAuthNavigation(): JSX.Element {
    return (
        <>
            <Link to="/login" children="Login" sx={{ color: 'white' }} />
            <Link to="/register" children="Register" sx={{ color: 'white' }} />
        </>
    )
}
