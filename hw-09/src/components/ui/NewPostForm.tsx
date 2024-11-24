import { useState } from 'react'
import { Field, Form } from 'formik'
import { Button, TextField } from '@mui/material'

import { VisuallyHiddenInput } from '.'
import type { NewPostFormProps } from '../../types/propsTypes'

export default function NewPostForm({
    setFieldValue,
    isSubmitting,
    errors,
    touched,
    loading
}: NewPostFormProps): JSX.Element {
    const [file, setFile] = useState<File | null>(null)

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
