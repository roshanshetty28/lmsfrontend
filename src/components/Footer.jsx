import React from 'react'
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 700 }}>About</Typography>
                <Link to='/about' style={{ textAlign: 'center', textDecoration: 'none' }}>The Website</Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', fontWeight: 700 }}>Contact</Typography>
                <Typography sx={{ textAlign: 'center' }}>Phone:&nbsp;+91 9930656759</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Box><IconButton><a href="https://www.linkedin.com/in/roshan-shetty-2000/"><LinkedInIcon color='primary' /></a></IconButton></Box>
                    <Box><IconButton><a href="https://github.com/roshanshetty28"><GitHubIcon color='primary' /></a></IconButton></Box>
                    <Box><IconButton><a href="mailto:roshanshetty2816@gmail.com"><MailIcon color='primary' /></a></IconButton></Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer