'use client'

import MainForm from '@/app/components/MainForm'
import { FormValuesI, loginOperation } from '@/app/lib/features/user/userOperations'
import { useAppDispatch } from '@/app/lib/hooks'
import { authorizeSchema } from '@/validation/authorizeSchema'
import { Box } from '@mui/material'
import { Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function Page() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const initialValues: FormValuesI = { username: '', password: '' }

    const handleSubmit = (values: FormValuesI, actions: FormikHelpers<FormValuesI>) =>
        toast.promise(
            dispatch(loginOperation(values))
                .unwrap()
                .finally(() => actions.resetForm()),
            {
                loading: 'Logging in...',
                success: () => {
                    router.push('/my-exhibits')
                    return 'Logged in successfully!'
                },
                error: (error) => {
                    console.error('Failed to log in: ', error.message)
                    return 'Failed to log in!'
                }
            }
        )

    return (
        <Box component="div" display="flex" justifyContent="center" alignItems="center" height="100%">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={authorizeSchema}>
                {({ errors, touched }) => (
                    <MainForm errors={errors} touched={touched} formLabel="Login" formTitle="Welcome back" />
                )}
            </Formik>
        </Box>
    )
}
