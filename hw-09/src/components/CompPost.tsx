import { useRequest } from 'ahooks'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Formik, FormikHelpers } from 'formik'

import { UI } from '.'
import { validation } from '../helpers/validation'
import { postExhibit } from '../api/apiExhibitActions'
import type { NewPostFormValuesI } from '../types/types'

export default function Post() {
    const { loading, runAsync } = useRequest(postExhibit, { manual: true })
    const initialValues: NewPostFormValuesI = { file: null, description: '' }
    const navigate = useNavigate()
    const handleSubmit = (
        values: NewPostFormValuesI,
        { setSubmitting, resetForm }: FormikHelpers<NewPostFormValuesI>
    ) => {
        const formData: FormData = new FormData()
        formData.append('file', values.file as File)
        formData.append('description', values.description)

        toast.promise(
            runAsync(formData).finally(() => {
                setSubmitting(false)
                resetForm()
            }),
            {
                loading: 'Creating post...',
                success: () => {
                    navigate('/home')
                    return 'Post created successfully'
                },
                error: (error) => {
                    console.error('Failed to register:', error.message)
                    return 'Failed to create post'
                }
            }
        )
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validation.newPost}>
            {({ isSubmitting, setFieldValue, errors, touched }) => (
                <>
                    <UI.NewPostForm
                        isSubmitting={isSubmitting}
                        setFieldValue={setFieldValue}
                        loading={loading}
                        errors={errors}
                        touched={touched}
                    />
                </>
            )}
        </Formik>
    )
}
