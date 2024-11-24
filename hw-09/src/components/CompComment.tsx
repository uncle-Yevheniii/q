//
import { useRequest } from 'ahooks'
import { toast } from 'react-hot-toast'
import { Box, Button, TextField } from '@mui/material'
import { Formik, Form, Field, FormikHelpers } from 'formik'

import { validation } from '../helpers/validation'
import { postComment } from '../api/apiCommentActions'
import type { CommentProps } from '../types/propsTypes'

export default function Comment({ postID, refreshAsync, incrementComment }: CommentProps): JSX.Element {
    const initialValues: { comment: string } = { comment: '' }
    const { loading, runAsync } = useRequest(postComment, { manual: true })

    const handleSubmit = (values: { comment: string }, actions: FormikHelpers<{ comment: string }>) =>
        toast.promise(
            runAsync(postID, values).finally(() => {
                actions.resetForm()
            }),
            {
                loading: 'Writing comment...',
                success: () => {
                    refreshAsync()
                    incrementComment()
                    return 'Comment write successfully'
                },
                error: (error) => {
                    console.error('Failed to write comment:', error.message)
                    return 'Failed to write comment'
                }
            }
        )
    return (
        <Box>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validation.newComment}>
                {({ touched, errors }) => (
                    <Form autoComplete="off">
                        <Field
                            error={touched.comment && Boolean(errors.comment)}
                            helperText={touched.comment && errors.comment}
                            as={TextField}
                            sx={{ width: '79%' }}
                            id="comment"
                            name="comment"
                            type="text"
                            label="Enter your comment"
                            variant="outlined"
                            autoComplete="off"
                        />
                        <Button
                            sx={{ width: '19%', height: '56px', ml: '2px' }}
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            color={touched.comment && Boolean(errors.comment) ? 'error' : 'primary'}
                        >
                            send
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
