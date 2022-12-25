import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { forgotPass } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotPass = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    const dispatch = useDispatch()
    const { token } = useParams()
    const { isLoading } = useSelector(state => state.user)
    const verify = () => {
        if (email === '') {
            alert('Enter a Email ID')
        } else {
            if (pass === pass2) {
                dispatch(forgotPass({ email, pass, token }))
            } else {
                alert("Password and confirm passsword must be same")
            }
        }
    }
    return (
        <>
            {isLoading === true ?
                <ClipLoader size={150} cssOverride={override} loading={true} /> :
                <Box>
                    <Box>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={pass2}
                            onChange={(e) => { setPass2(e.target.value) }}
                        />
                    </Box>
                    <Box>
                        <Button onClick={verify}>Verify</Button>
                    </Box>
                </Box>
            }
        </>
    )
}

export default ForgotPass