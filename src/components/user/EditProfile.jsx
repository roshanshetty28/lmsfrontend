import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { editProfileSchema } from '../../schema/AuthSchema'
import { editDetails } from '../../features/auth/authSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const EditProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.user)
    const initialValues = {
        name: user.name,
        mail: user.email
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: editProfileSchema,
        onSubmit: (values) => {
            dispatch(editDetails(values))
        }
    })
    return (
        <Box>
            <Box><Typography variant="h2" sx={{ textAlign: 'center' }}>Edit Profile</Typography></Box>
            <Card sx={{ minHeight: '77vh', boxShadow: '1px 2px #3f48f2' }}>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="edit-profile-name"
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name ? errors.name : null}
                        error={errors.name && touched.name}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="edit-profile-mail"
                        label="E-Mail ID"
                        name="mail"
                        value={values.mail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.mail && touched.mail ? errors.mail : null}
                        error={errors.mail && touched.mail}
                    />
                </Box>
                <Box sx={{ m: 1, width: '100%', pr: 1.9 }}>
                    <Button fullWidth onClick={handleSubmit} variant="contained" disabled={isLoading === true ? true : false}>{isLoading === true ? 'Updating...' : 'Update'}</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default EditProfile