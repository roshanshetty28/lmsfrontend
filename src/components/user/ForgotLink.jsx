import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotLink } from '../../features/user/userSlice'
import { useFormik } from 'formik'
import { forgotLinkValidation } from '../../schema/UserSchema'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const initialValues = {
    email: ""
}

const ForgotLink = () => {
    const dispatch = useDispatch()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotLinkValidation,
        onSubmit: (values, { resetForm }) => {
            dispatch(forgotLink(values.email))
            resetForm()
        }
    })
    const { isLoading } = useSelector(state => state.user)
    return (
        <Box sx={{ width: '100%', height: '90vh', backgroundColor: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ p: 2 }}>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="forgotLinkEmail"
                        label="Email ID"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.email && touched.email ? errors.email : null}
                        error={errors.email && touched.email}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <Button disabled={isLoading === true ? true : false} variant='contained' onClick={handleSubmit}>{isLoading === false ? 'Send Verification Email' : 'Sending...'}</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default ForgotLink