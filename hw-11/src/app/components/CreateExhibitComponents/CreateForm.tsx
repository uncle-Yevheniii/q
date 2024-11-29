'use client'

import { Button, Container, TextField, Typography } from '@mui/material'
import { Form, Field, FormikState, FormikHelpers } from 'formik'
import VisuallyHiddenInput from './VisuallyHiddenInput'
import { useState } from 'react'
import { ImageUp, SendIcon } from 'lucide-react'

export interface NewPostFormValuesI {
    file: File | null
    description: string
}
interface CreateFormProps {
    errors: FormikState<NewPostFormValuesI>['errors']
    touched: FormikState<NewPostFormValuesI>['touched']
    setFieldValue: FormikHelpers<NewPostFormValuesI>['setFieldValue']
    isSubmitting: FormikState<NewPostFormValuesI>['isSubmitting']
}

export default function CreateForm({ isSubmitting, setFieldValue, errors, touched }: CreateFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const labelName = Boolean(errors.file) ? errors.file : file ? file.name : 'Upload file'
    return (
        <Container component="div">
            <Typography variant="h4" component="h1" align="center" marginBottom={2}>
                Create exhibit
            </Typography>
            <Form>
                <Button
                    fullWidth
                    endIcon={<ImageUp />}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    color={Boolean(errors.file) ? 'error' : 'primary'}
                >
                    {labelName}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                                setFile(files[0])
                                setFieldValue('file', files[0])
                            }
                        }}
                    />
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
                    endIcon={<SendIcon />}
                    variant="contained"
                    type="submit"
                    size="large"
                    component="button"
                    fullWidth
                    sx={{ mt: 1 }}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
