import React, { useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePlan } from "../../features/admin/adminSlice"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const UpdateSubscriptionPlan = () => {
    const dispatch = useDispatch()
    const [id, setID] = useState('')
    const [months, setMonths] = useState('')
    const { isLoading } = useSelector(state => state.admin)
    const handleSubmit = async () => {
        dispatch(UpdatePlan({ id, months }))
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', m: 1, p: 1 }}>
            <Box sx={{ m: 1 }}>
                <TextField id="plan-id" name="plan-id" label="User ID" value={id} onChange={(e) => setID(e.target.value)} />
            </Box>
            <Box sx={{ m: 1, minWidth: 120 }}>
                <FormControl>
                    <InputLabel id="plan-month-label" >Sort:</InputLabel>
                    <Select sx={{ width: 150 }} label="Sort:" labelId="plan-month-select" id="plan-month" value={months} onChange={(e) => setMonths(e.target.value)}>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ m: 1 }}>
                <Button variant='contained' disabled={isLoading === false ? false : true} onClick={handleSubmit}>{isLoading === false ? "Update" : "Updating..."}</Button>
            </Box>
        </Box>
    )
}

export default UpdateSubscriptionPlan