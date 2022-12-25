import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotLink } from '../../features/user/userSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotLink = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.user)
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    const handleForgot = () => {
        if (email !== '') {
            dispatch(forgotLink(email))
        } else {
            alert('Enter a Email ID')
        }
    }
    return (
        <>{isLoading === true ?
            <ClipLoader size={150} cssOverride={override} loading={true} /> :
            <Box>
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email ID"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </Box>
                <Box>
                    <Button onClick={handleForgot}>Send Verification Email</Button>
                </Box>
            </Box>
        }
        </>
    )
}

export default ForgotLink