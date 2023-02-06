import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ErrorComponent = () => {
  const navigate = useNavigate()
  useEffect(() =>
    navigate(-1)
    , [navigate])

  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ textAlign: 'center' }}>Wrong Web Address</Typography>
    </Box>
  )
}

export default ErrorComponent