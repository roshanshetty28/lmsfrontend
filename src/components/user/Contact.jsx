import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { contact } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

const Contact = () => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const handleContact = () => {
        const data = {
            name: name,
            mail: mail,
            subject: subject,
            message: message
        }
        dispatch(contact(data))
    }
    return (
        <Box>
            <Box><Typography variant="h2" sx={{ textAlign: 'center' }}>Contact Us</Typography></Box>
            <Card sx={{ minHeight: '77vh', boxShadow: '1px 2px #3f48f2' }}>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="E-Mail ID"
                        value={mail}
                        onChange={(e) => { setMail(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Subject"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={10}
                        placeholder="Message"
                        style={{ width: '100%' }}
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                    />
                </Box>
                <Box sx={{ m: 1 }}>
                    <Button onClick={handleContact} variant="contained">Send</Button>
                </Box>
            </Card>
        </Box>
    )
}

export default Contact