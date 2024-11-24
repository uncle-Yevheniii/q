import { toast } from 'react-hot-toast'
import { Formik, FormikHelpers } from 'formik'

import Form from './ui/Form'
import FormRedirect from './ui/FormRedirect'
import { useAppDispatch } from '../store/hook'
import { validation } from '../helpers/validation'
import { loginOperation } from '../store/slices/userSlice'

import type { FormValuesI } from '../types/types'

export default function LoginForm(): JSX.Element {
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
                    return 'Logged in successfully!'
                },
                error: (error) => {
                    console.error('Failed to log in: ', error.message)
                    return 'Failed to log in!'
                }
            }
        )

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validation.login}>
            {({ errors, touched }) => (
                <Form page="Login" errors={errors} touched={touched}>
                    <FormRedirect to="/login" label="Already have an account?" linkLabel="Login" />
                </Form>
            )}
        </Formik>
    )
}
