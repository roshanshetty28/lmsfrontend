import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const About = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: 600 }}>About the Website</Typography>
      <Typography>Read about this Project <a href='https://github.com/roshanshetty28/lmsbackend#library-management-system'>here</a>, in github.</Typography>
      <Typography>About page coming soon.</Typography>
    </Box>
  )
}

export default About