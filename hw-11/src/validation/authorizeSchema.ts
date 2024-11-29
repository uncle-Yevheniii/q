import * as Yup from 'yup'
import { FormValuesI } from '@/app/lib/features/user/userOperations'

export const authorizeSchema = Yup.object<FormValuesI>().shape({
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .max(30, 'Name must be less than 30 characters long')
        .required('Username is required!'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password must be less than 20 characters long.')
        .matches(
            new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/),
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        )
        .required('Password is required!')
})
