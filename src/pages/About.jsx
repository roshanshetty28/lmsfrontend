import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const About = () => {
  return (
    <Box>
        <Typography variant='h5' sx={{textAlign:'center',fontWeight:600}}>About the Website</Typography>
        <Typography variant='p'>This web-app is a Library Management System. This website caters the needs of Librarian as well as general Users.</Typography>
        <Typography>The Librarian </Typography>
    </Box>
  )
}

export default About