import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsLetter } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const NewsLetter = () => {
  const [audience, setAudience] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  const handleAudience = (e) => {
    setAudience(e.target.value)
  }
  const { isLoading } = useSelector((state) => state.admin)
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  const handleSend = () => {
    const data = {
      audience: audience,
      subject: subject,
      body: body
    }
    dispatch(newsLetter(data))
  }

  return (
    <>
      {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> :
        <Box sx={{ minHeight: '77vh', border: '1px solid black', borderRadius: '5px' }}>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label" >Send To:</InputLabel>
              <Select sx={{ width: 150 }} label="Send To" labelId="demo-simple-select-label" id="demo-simple-select" value={audience} onChange={handleAudience}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="subscribers">Subscribers</MenuItem>
              </Select>
            </FormControl>
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
              placeholder="Body"
              style={{ width: '100%', border: '0.1px solid #a6bfbc', borderRadius: '4px' }}
              value={body}
              onChange={(e) => { setBody(e.target.value) }}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <Button onClick={handleSend} variant="outlined" startIcon={<SendIcon />}>Send News</Button>
          </Box>
        </Box>
      }
    </>
  )
}

export default NewsLetter