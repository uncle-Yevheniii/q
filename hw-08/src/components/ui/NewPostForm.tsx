import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, TextField } from '@mui/material'
import { Field, Form, FormikHelpers, FormikState } from 'formik'

import type { NewPostFormValuesI } from '../../types/types'

interface NewPostFormProps {
    loading: boolean
    errors: FormikState<NewPostFormValuesI>['errors']
    touched: FormikState<NewPostFormValuesI>['touched']
    setFieldValue: FormikHelpers<NewPostFormValuesI>['setFieldValue']
    isSubmitting: FormikState<NewPostFormValuesI>['isSubmitting']
}

export default function NewPostForm({
    setFieldValue,
    isSubmitting,
    errors,
    touched,
    loading
}: NewPostFormProps): JSX.Element {
    const [file, setFile] = useState<File | null>(null)
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setFile(files[0])
            setFieldValue('file', files[0])
        }
    }

    const labelName = Boolean(errors.file) ? errors.file : file ? file.name : 'Upload file'
    return (
        <Form autoComplete="off">
            <Button
                fullWidth
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                color={Boolean(errors.file) ? 'error' : 'primary'}
            >
                {labelName}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
            </Button>
            <Field
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                as={TextField}
                rows={10}
                id="description"
                name="description"
                type="text"
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                fullWidth
            />
            <Button
                variant="contained"
                type="submit"
                size="large"
                component="button"
                fullWidth
                sx={{ mt: 1 }}
                disabled={isSubmitting || loading}
            >
                Submit
            </Button>
        </Form>
    )
}
