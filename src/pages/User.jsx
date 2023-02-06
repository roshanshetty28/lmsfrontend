import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const User = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const requiredWidth = useMediaQuery("(max-width:400px)");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const check = localStorage.getItem('user');
    const j = JSON.parse(check)
    if (!user && !check) {
      navigate('/login');
    }
    if (j.admin === true) {
      navigate('/')
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
      {requiredWidth === false ? <nav className="usertab">
        <NavLink to='/users/userissued'>Issued Books</NavLink>
        <NavLink to='/users/userrequested'>Requested Books</NavLink>
        <NavLink to='/users/userinventory'>Inventory</NavLink>
        <NavLink to='/users/wishlist'>WishList</NavLink>
      </nav> : <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, mb: 1 }}><IconButton onClick={handleOpen}><MenuIcon style={{ color: 'black' }} /></IconButton><Typography>Menu</Typography>
      </Box>}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#c1c8e4',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        ><Typography sx={{ pl: 1 }}>Back To Main</Typography>
          <IconButton onClick={handleOpen}>
            <ArrowBackIosNewIcon style={{ color: 'black' }} />
          </IconButton>
        </Box>
        <Divider />
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <Box className="elemBox">
            <NavLink to='/users/userissued'>Issued Books</NavLink>
          </Box>
          <Box className="elemBox">
            <NavLink to='/users/userrequested'>Requested Books</NavLink>
          </Box>
          <Box className="elemBox">
            <NavLink to='/users/userinventory'>Inventory</NavLink>
          </Box>
          <Box className="elemBox">
            <NavLink to='/users/wishlist'>WishList</NavLink>
          </Box>
        </nav>
      </Drawer>
      <Outlet />
    </div>
  );
};
export default User;