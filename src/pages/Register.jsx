import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import { subscribe } from '../features/user/userSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Card from '@mui/material/Card';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { isSuccess } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubscribe = () => {
        dispatch(subscribe())
        handleClose()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            throw new Error('Paswords do not match')
        }
        const userdata = {
            name: name, email: email, password: password, admin: false,
        }
        dispatch(register(userdata))
        setName('')
        setEmail('')
        setPassword('')
        setPassword2('')
    }

    useEffect(() => {
        if (isSuccess) {
            handleClickOpen()
            navigate('/users')
        }
        return () => dispatch(reset())
    }, [isSuccess, navigate, dispatch])
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '93vh', alignItems: 'center' }}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'pink' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h3" component='h3'>Register</Typography>
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 2 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Confirm Password"
                        value={password2}
                        onChange={(e) => { setPassword2(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row' }}>
                    <Typography>Already have an account?&nbsp;</Typography>
                    <Typography><NavLink to='/login'>Login</NavLink></Typography>
                </Box>
                <Box>
                    <Button sx={{ m: 2 }} variant='contained' onClick={handleSubmit}>Submit</Button>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Would you like to subscribe to our news channel?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleSubscribe} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Box>
    )
}

export default Register