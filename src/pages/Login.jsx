import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isSuccess } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      admin: type
    }
    dispatch(login(userData))
  };
  useEffect(() => {
    if (isSuccess) {
      if (type === true) {
        navigate('/')
      }
      else {
        navigate('/users')
      }
    }
    dispatch(reset())
  }, [isSuccess, navigate, dispatch])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '93vh', alignItems: 'center' }}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'pink', width: '270px', height: 'fit-content' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h3" component='h3'>Login</Typography>
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
        <Box>
          <Typography><NavLink to='/forgotlink'>Forgot Password?</NavLink></Typography>
        </Box>
        <Box sx={{ m: 2 }}>
          <FormGroup>
            <FormControlLabel
              onChange={(e) => setType(e.target.checked)}
              value={type}
              control={<Checkbox />}
              label='Login as Admin'
            />
          </FormGroup>
        </Box>
        <Box sx={{ m: 2, display: 'flex', flexDirection: 'row' }}>
          <Typography>Don't have an account?&nbsp;</Typography>
          <Typography><NavLink to='/register'>Register</NavLink></Typography>
        </Box>
        <Box>
          <Button sx={{ m: 2 }} variant='contained' onClick={handleSubmit}>Login</Button>
        </Box>
      </Card>
    </Box>
  );
};
export default Login;
