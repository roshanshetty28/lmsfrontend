import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscribe, unsubscribe } from "../../features/user/userSlice"

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider'

const MyAccount = () => {
    const [id, setID] = useState('')
    const dispatch = useDispatch()
    const handleUnsubscribe = () => {
        dispatch(unsubscribe(id))
    }
    const handleSubscribe = () => {
        dispatch(subscribe())
    }
    const { user, isLoading } = useSelector((state) => state.auth)
    return (
        <Box>
            <Box>
                <Typography variant="h6">Newsletter Subscription</Typography>
                {user.subscriber === true ?
                    <Box sx={{ diplay: "flex", flexDirection: 'column' }}>
                        <Box sx={{ mb: 1 }}>
                            <TextField
                                required
                                id="outlined-required"
                                label="ID"
                                value={id}
                                onChange={(e) => { setID(e.target.value) }}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" color="error" onClick={handleUnsubscribe}>Unsubscribe</Button>
                        </Box>
                    </Box> : <Box>
                        <Button color='success' variant='contained' disabled={isLoading === true ? true : false} onClick={handleSubscribe}>{isLoading === true ? "Subscribing..." : "Subscribe"}</Button>
                    </Box>}
            </Box>
            <Divider sx={{ p: 1 }} />
            <Box>
                <Typography variant='h6'>Subscription Plans</Typography>
                <Typography>2 months remaining</Typography>
                <Button variant="contained">Renew</Button>
            </Box>
        </Box>
    )
}

export default MyAccount