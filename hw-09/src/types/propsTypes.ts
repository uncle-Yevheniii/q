import { FormikHelpers, FormikState } from 'formik'
import type { LinkProps as MuiLinkProps } from '@mui/material'
import type { LinkProps as RouterLinkProps } from 'react-router-dom'
import type { CommentI, FormValuesI, NewPostFormValuesI } from './types'

export interface ExhibitCardProps {
    imgUrl: string
    description: string
    username: string
    postID: number
    userCreator: string
    createdAt: string
    commentCount: number
}
export interface ExhibitCardHeaderProps {
    subheader: string
    username: string
    isCreator: boolean
    handleOpen: () => void
    loadingComments: boolean
}
export interface ExhibitButtonProps {
    userCreator: string
    handleOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface CommentProps {
    postID: number
    refreshAsync: () => void
    incrementComment: () => void
}
export interface CommentsListProps {
    postID: number
    data: CommentI[]
    refreshAsync: () => void
    decrementComment: () => void
}
export interface CommentsCardProps {
    commentID: number
    postID: number
    comment: string
    createdAt: string
    username: string
    refreshAsync: () => void
    decrementComment: () => void
}

export interface ModalProps {
    open: boolean
    children: JSX.Element
    handleClose: () => void
    ariaLabelledby?: string
    ariaDescribedby?: string
}
export interface FormProps {
    page: string
    children: JSX.Element
    errors: FormikState<FormValuesI>['errors']
    touched: FormikState<FormValuesI>['touched']
}
export interface NewPostFormProps {
    loading: boolean
    errors: FormikState<NewPostFormValuesI>['errors']
    touched: FormikState<NewPostFormValuesI>['touched']
    setFieldValue: FormikHelpers<NewPostFormValuesI>['setFieldValue']
    isSubmitting: FormikState<NewPostFormValuesI>['isSubmitting']
}
export interface FormRedirectProps {
    to: string
    label: string
    linkLabel: string
}

export type CombinedLinkProps = MuiLinkProps &
    RouterLinkProps & {
        to?: string
    }
