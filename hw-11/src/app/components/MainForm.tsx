import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material'
import { Field, Form, FormikState } from 'formik'
import { useAppSelector } from '@/app/lib/hooks'
import { useState } from 'react'
import { RootState } from '@/app/lib/store'
import { FormValuesI } from '../lib/features/user/userOperations'
import { Lock, LogIn, User } from 'lucide-react'

interface MainFormProps {
    formLabel: string
    formTitle: string
    children?: JSX.Element
    errors: FormikState<FormValuesI>['errors']
    touched: FormikState<FormValuesI>['touched']
}

export default function MainForm({ formTitle, formLabel, touched, errors }: MainFormProps) {
    const [checked, setChecked] = useState<boolean>(false)
    const loading = useAppSelector((state: RootState) => state.user.loading)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => setChecked(event.target.checked)

    return (
        <Container component="div">
            <Typography variant="h4" component="h1" align="center" marginBottom={2}>
                {formTitle}
            </Typography>

            <Form>
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
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <User />
                                </InputAdornment>
                            )
                        }
                    }}
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
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <FormControlLabel
                    label="Password visibility"
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                />
                <Button variant="contained" type="submit" size="large" fullWidth sx={{ mt: 1 }} endIcon={<LogIn />}>
                    {loading ? <CircularProgress /> : formLabel}
                </Button>
            </Form>
        </Container>
    )
}
