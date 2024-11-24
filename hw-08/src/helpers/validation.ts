import * as Yup from 'yup'
import { FormValuesI, NewPostFormValuesI } from '../types/types'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const MAX_FILE_SIZE = 2 * 1024 * 1024

export const validation = {
    registration: Yup.object<FormValuesI>().shape({
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
    }),
    login: Yup.object<FormValuesI>().shape({
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
    }),
    newPost: Yup.object<NewPostFormValuesI>().shape({
        description: Yup.string()
            .min(3, 'Description must be at least 3 character long')
            .max(1000, 'Description must be less than 1000 characters long')
            .required('Description is required!'),
        file: Yup.mixed()
            .required('Image is required!')
            .test('fileSize', 'File size should be less than 2 MB', (value) => {
                return value && (value as File).size <= MAX_FILE_SIZE
            })
            .test('fileFormat', 'Unsupported file format', (value) => {
                return value && SUPPORTED_FORMATS.includes((value as File).type)
            })
    }),
    newComment: Yup.object<{ comment: string }>().shape({
        comment: Yup.string()
            .min(3, 'Comment must be at least 3 characters long')
            .max(300, 'Comment must be less than 300 characters long')
            .required('Comment is required!')
    })
}
