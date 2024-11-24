import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Formik, FormikHelpers } from 'formik'

import Form from './ui/Form'
import FormRedirect from './ui/FormRedirect'
import { useAppDispatch } from '../store/hook'
import { validation } from '../helpers/validation'
import { registerOperation } from '../store/slices/userSlice'

import type { FormValuesI } from '../types/types'

export default function RegisterForm(): JSX.Element {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const initialValues: FormValuesI = { username: '', password: '' }

    const handleSubmit = (values: FormValuesI, actions: FormikHelpers<FormValuesI>) =>
        toast.promise(
            dispatch(registerOperation(values))
                .unwrap()
                .finally(() => actions.resetForm()),
            {
                loading: 'Registering...',
                success: () => {
                    navigate('/login')
                    return 'Registered successfully!'
                },
                error: (error) => {
                    console.error('Failed to register:', error.message)
                    return 'Failed to register'
                }
            }
        )

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validation.registration}>
            {({ errors, touched }) => (
                <Form page="Register" errors={errors} touched={touched}>
                    <FormRedirect to="/login" label="Already have an account?" linkLabel="Login" />
                </Form>
            )}
        </Formik>
    )
}
