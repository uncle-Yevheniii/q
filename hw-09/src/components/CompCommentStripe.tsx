import { useRequest } from 'ahooks'
// import { AccordionDetails, Alert, CardContent, CircularProgress } from '@mui/material'

// import { CommentsList } from './ui'
// import { getAllComments } from '../api/apiCommentActions'

// export default function CommentStripe({ postID }: { postID: number }): JSX.Element {
//     // const { isAuthenticated, getToken } = useAuth()
//     const { data, error, loading } = useRequest(() => getAllComments(postID), {
//         manual: true
//     })

//     if (loading) return <CircularProgress size={80} />
//     if (error) return <Alert severity="error">{`${error.message}! Try reload page.`}</Alert>
//     return (
//         <AccordionDetails>
//             {/* {getToken && isAuthenticated ? <Comment postID={postID} /> : null} */}

//             <CardContent>
//                 <CommentsList data={data || []} postID={postID} />
//             </CardContent>
//         </AccordionDetails>
//     )
// }
