import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import { useFormik } from 'formik'
import { registerSchema } from '../schema/AuthSchema'
import Footer from '../components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

const initialValues = {
    name: "John",
    email: "ak@gm.co",
    password: "John@222",
    password2: "John@222"
}

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isLoading } = useSelector((state) => state.auth)
    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(register(values))
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            navigate('/users')
        }
        return () => dispatch(reset())
    }, [isSuccess, navigate, dispatch])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ p: 2, m: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#c1d2f5' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h3" component='h3'>Register</Typography>
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        name="name"
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name ? errors.name : null}
                        error={errors.name && touched.name}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        name="email"
                        id="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.email && touched.email ? errors.email : null}
                        error={errors.email && touched.email}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        name="password"
                        id="password"
                        label="Password"
                        value={values.password}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.password && touched.password ? errors.password : null}
                        error={errors.password && touched.password}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        name="password2"
                        id="password2"
                        label="Confirm Password"
                        value={values.password2}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.password2 && touched.password2 ? errors.password2 : null}
                        error={errors.password2 && touched.password2}
                    />
                </Box>
                <Box sx={{ m: 1, display: 'flex', flexDirection: 'row' }}>
                    <Typography>Already have an account?&nbsp;</Typography>
                    <Typography><NavLink to='/login'>Login</NavLink></Typography>
                </Box>
                <Box>
                    <Button disabled={isLoading === true ? true : false} sx={{ m: 2 }} type="submit" variant='contained' onClick={handleSubmit}>{isLoading === false ? 'Submit' : 'Submitting...'}</Button>
                </Box>
            </Card>
            <Divider sx={{ width: '100%', m: 2 }} />
            <Footer />
        </Box>
    )
}

export default Register