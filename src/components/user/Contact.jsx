import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { contact } from '../../features/user/userSlice'
import { contactFormValidation } from '../../schema/UserSchema'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const initialValues = {
    name: "",
    mail: "",
    subject: "",
    message: ""
}

const Contact = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: contactFormValidation,
        onSubmit: (values, { resetForm }) => {
            dispatch(contact(values))
            resetForm()
        }
    })
    return (
        <Box>
            <Box><Typography variant="h2" sx={{ textAlign: 'center' }}>Contact Us</Typography></Box>
            <Card sx={{ minHeight: '77vh', boxShadow: '1px 2px #3f48f2' }}>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        id="contact-name"
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
                        id="contact-mail"
                        label="E-Mail ID"
                        name="mail"
                        value={values.mail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.mail && touched.mail ? errors.mail : null}
                        error={errors.mail && touched.mail}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        id="contact-subject"
                        label="Subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.subject && touched.subject ? errors.subject : null}
                        error={errors.subject && touched.subject}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={10}
                        placeholder="Message *"
                        style={{ fontSize: 17, width: '100%', borderRadius: 5, borderColor: errors.message && touched.message ? 'red' : '#bfbdb8' }}
                        id="contact-message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Typography sx={{ fontSize: 12, pl: 2, color: 'red' }}>{errors.message && touched.message ? errors.message : null}</Typography>
                </Box>
                <Box sx={{ m: 1, width: '100%', pr: 1.9 }}>
                    <Button disabled={isLoading === true ? true : false} fullWidth onClick={handleSubmit} variant="contained">{isLoading === false ? 'Send' : 'Sending...'}</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Contact