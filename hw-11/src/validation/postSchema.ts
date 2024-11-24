import * as Yup from 'yup'
import { CreateExhibitFormValues } from '@/types/typeResponse'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

export const postSchema = Yup.object<CreateExhibitFormValues>().shape({
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
})
