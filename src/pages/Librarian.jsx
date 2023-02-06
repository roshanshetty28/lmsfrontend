import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Librarian = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const requiredWidth = useMediaQuery("(max-width:900px)");
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
    if (j.admin === false) {
      navigate('/users')
    }
  }, [user, navigate]);
  return (
    <>
      <div className='librarian'>
        <Navbar />
        {requiredWidth === false ? <nav className="librariantab">
          <NavLink to="/issue">Issue</NavLink>
          <NavLink to="/issued">Return</NavLink>
          <NavLink to="/requested">Requested</NavLink>
          <NavLink to="/duebooks">Due Books</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          <NavLink to="/user">Users</NavLink>
          <NavLink to="/addbook">Add Book</NavLink>
          <NavLink to="/subscribers">Subscribers</NavLink>
          <NavLink to="/news">News Letter</NavLink>
          <NavLink to="/logs">Activity Logs</NavLink>
          <NavLink to="/blocked">Blocked Users</NavLink>
        </nav> : <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1 }}><IconButton onClick={handleOpen}><MenuIcon style={{ color: 'black' }} /></IconButton><Typography>Menu</Typography>
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
              <NavLink to="/issue">Issue</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/issued">Return</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/requested">Requested</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/duebooks">Due Books</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/inventory">Inventory</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/user">Users</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/addbook">Add Book</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/subscribers">Subscribers</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/news">News Letter</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/logs">Activity Logs</NavLink>
            </Box>
            <Box className="elemBox">
              <NavLink to="/logs">Blocked Users</NavLink>
            </Box>
          </nav>
        </Drawer>
        {location.pathname === "/" ? <Navigate to='/issue' /> : <Outlet />}
      </div>
    </>
  );
};
export default Librarian;
