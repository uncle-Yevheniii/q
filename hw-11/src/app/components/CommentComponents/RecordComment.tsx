'use client'

import { postComment } from '@/api/apiCommentActions'
import { useAuth } from '@/hooks/useAuth'
import { commentSchema } from '@/validation/commentSchema'
import { TextField, Button, InputAdornment } from '@mui/material'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { MessageCircle, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface RecordCommentI {
    exhibitID: number
    children?: React.ReactNode
    refreshAsync?: () => void
    refreshAsyncTotal?: () => void
}

export default function RecordComment({ exhibitID, refreshAsync, children, refreshAsyncTotal }: RecordCommentI) {
    const router = useRouter()
    const { token, userAuth } = useAuth()

    const initialValues: { comment: string } = { comment: '' }
    const handleSubmit = (v: { comment: string }, action: FormikHelpers<{ comment: string }>) => {
        toast.promise(postComment(exhibitID, v), {
            loading: 'Record comment...',
            success: () => {
                refreshAsyncTotal?.()
                refreshAsync?.()
                action.resetForm()
                router.refresh()
                return 'Comment record successfully'
            },
            error: (error) => {
                console.error('Failed to record comment:', error.message)
                return 'Failed to record comment'
            }
        })
    }
    return (
        <>
            {userAuth && token ? (
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={commentSchema}>
                    <Form style={{ margin: '1rem 0' }} autoComplete="off">
                        <Field
                            id="comment"
                            name="comment"
                            autoComplete="off"
                            placeholder="Write a comment..."
                            as={TextField}
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MessageCircle />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Button type="submit" endIcon={<Send />} variant="contained" fullWidth>
                                                Send
                                            </Button>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Form>
                </Formik>
            ) : null}
            {children}
        </>
    )
}
