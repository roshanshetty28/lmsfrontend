import React, { useState } from 'react';
import { logout } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetUser } from '../features/user/userSlice'
import { resetAdmin } from '../features/admin/adminSlice'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

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
  const handleAccount = () => {
    navigate('/account')
  }
  const handleEditDetails = () => {
    navigate('/edit-profile')
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="navbar">
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}><LocalLibraryIcon /><Typography variant='h6' sx={{ pl: 1 }}>Library</Typography></Box>
        <Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ m: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user.admin === false ? <MenuItem onClick={handleAccount}>
              <Avatar /> My account
            </MenuItem> : null}
            {user.admin === false ? <Divider /> : null}
            {user.admin === false ? <MenuItem onClick={handleEditDetails}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Edit Profile
            </MenuItem> : null}
            {user.admin === false ? <MenuItem onClick={handleContact}>
              <ListItemIcon>
                <ContactMailIcon fontSize="small" />
              </ListItemIcon>
              Contact Us
            </MenuItem> : null}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </>
  );
};
export default Navbar;
