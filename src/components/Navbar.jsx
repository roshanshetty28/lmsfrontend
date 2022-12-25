import React from 'react';
import { logout } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { resetUser } from '../features/user/userSlice'
import { resetAdmin } from '../features/admin/adminSlice'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetAdmin())
    dispatch(resetUser())
    navigate('/login')
  };
  const { user } = useSelector((state) => state.auth)

  const handleContact = () => {
    navigate('/contact')
  }

  return (
    <>
      <div className="navbar">
        <Typography sx={{ml:4}}>Library</Typography>
        <Box>
        {user.admin === false ?<Button variant='outlined' color='inherit' onClick={handleContact}>Contact Us</Button> : null}
          <Button variant='outlined' color='inherit' sx={{ ml: 1,mr:1 }} onClick={handleLogout}>Logout</Button>
        </Box>
      </div>
    </>
  );
};
export default Navbar;
