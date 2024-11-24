'use client'

import { Formik, FormikHelpers } from 'formik'
import CreateForm from '@/app/components/CreateExhibitComponents/CreateForm'
import { Box } from '@mui/material'
import { toast } from 'react-hot-toast'
import { postExhibit } from '@/api/apiExhibitActions'
import { useRouter } from 'next/navigation'
import { CreateExhibitFormValues } from '@/types/typeResponse'
import { postSchema } from '@/validation/postSchema'

export default function Page() {
    const router = useRouter()
    const initialValues: CreateExhibitFormValues = { file: null, description: '' }

    const handleSubmit = (
        v: CreateExhibitFormValues,
        { setSubmitting, resetForm }: FormikHelpers<CreateExhibitFormValues>
    ) => {
        const formData: FormData = new FormData()
        formData.append('file', v.file as File)
        formData.append('description', v.description)

        toast.promise(
            postExhibit(formData).finally(() => {
                setSubmitting(false)
                resetForm()
            }),
            {
                loading: 'Creating exhibit...',
                success: () => {
                    router.push('/my-exhibits')
                    return 'Exhibit created successfully'
                },
                error: (err) => {
                    console.error('Failed to create exhibit:', err.message)
                    return 'Failed to create exhibit'
                }
            }
        )
    }

    return (
        <Box component="div" display="flex" justifyContent="center" alignItems="center" height="100%">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={postSchema}>
                {({ isSubmitting, setFieldValue, errors, touched }) => (
                    <CreateForm
                        errors={errors}
                        touched={touched}
                        isSubmitting={isSubmitting}
                        setFieldValue={setFieldValue}
                    />
                )}
            </Formik>
        </Box>
    )
}
