import { useState } from 'react'
import { Form as FormikForm, Field, FormikState } from 'formik'
import { Button, Checkbox, CircularProgress, FormControlLabel, TextField } from '@mui/material'

import { RootState } from '../../store/store'
import { useAppSelector } from '../../store/hook'
import type { FormValuesI } from '../../types/types'

interface FormProps {
    page: string
    children: JSX.Element
    errors: FormikState<FormValuesI>['errors']
    touched: FormikState<FormValuesI>['touched']
}

export default function Form({ children, page, errors, touched }: FormProps): JSX.Element {
    const [checked, setChecked] = useState<boolean>(false)
    const loading = useAppSelector((state: RootState) => state.user.loading)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => setChecked(event.target.checked)

    return (
        <FormikForm autoComplete="off">
            <Field
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                as={TextField}
                id="username"
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                autoComplete="off"
                margin="normal"
                fullWidth
            />
            <Field
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                as={TextField}
                id="password"
                name="password"
                type={checked ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                autoComplete="off"
                margin="normal"
                fullWidth
            />
            <FormControlLabel
                label="Password visibility"
                control={
                    <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                }
            />
            <Button variant="contained" type="submit" size="large" fullWidth sx={{ mt: 1 }}>
                {loading ? <CircularProgress /> : page}
            </Button>

            {children}
        </FormikForm>
    )
}
