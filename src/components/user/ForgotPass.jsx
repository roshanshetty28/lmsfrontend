import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { forgotPass } from '../../features/user/userSlice'
import { useFormik } from 'formik'
import { resetpassValidation } from '../../schema/UserSchema'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const initialValues = {
    email: '',
    pass: '',
    pass2: ''
}

const ForgotPass = () => {
    const dispatch = useDispatch()
    const { token } = useParams()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: resetpassValidation,
        onSubmit: (values, { resetForm }) => {
            dispatch(forgotPass({ ...values, token: token }))
            resetForm()
        }
    })
    const { isLoading } = useSelector(state => state.user)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '90vh', background: '1px solid black' }}>
            <Card sx={{ p: 2 }}>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="forgotpass-email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.email && touched.email ? errors.email : null}
                        error={errors.email && touched.email}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="forgotpass-pass"
                        label="Password"
                        name="pass"
                        value={values.pass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.pass && touched.pass ? errors.pass : null}
                        error={errors.pass && touched.pass}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="forgotpass-pass2"
                        label="Confirm Password"
                        name="pass2"
                        value={values.pass2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.pass2 && touched.pass2 ? errors.pass2 : null}
                        error={errors.pass2 && touched.pass2}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <Button fullWidth variant='contained' disabled={isLoading === true ? true : false} onClick={handleSubmit}>{isLoading === false ? 'Reset Password' : 'Reseting...'}</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default ForgotPass