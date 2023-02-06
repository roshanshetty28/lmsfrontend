import React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
    return (
        <Box sx={{ width: '100%', top: '50%', height: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress thickness={1} size={200} />
        </Box>
    )
}

export default Spinner