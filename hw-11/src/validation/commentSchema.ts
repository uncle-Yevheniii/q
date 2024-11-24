import * as Yup from 'yup'

export const commentSchema = Yup.object<{ comment: string }>().shape({
    comment: Yup.string()
        .min(3, 'Comment must be at least 3 characters long')
        .max(300, 'Comment must be less than 300 characters long')
        .required('Comment is required!')
})
