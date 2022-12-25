import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unsubscribe } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Unsubscribe = () => {
    const [id, setID] = useState('')
    const dispatch = useDispatch()
    const handleUnsubscribe = () => {
        dispatch(unsubscribe(id))
    }
    return (
        <Box>
            <Box>
                <TextField
                    required
                    id="outlined-required"
                    label="ID"
                    value={id}
                    onChange={(e) => { setID(e.target.value) }}
                />
            </Box>
            <Box onClick={handleUnsubscribe}>
                <Button>Unsubscribe</Button>
            </Box>
        </Box>
    )
}

export default Unsubscribe