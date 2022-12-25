import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorComponent = () => {
  const navigate = useNavigate()
  
  useEffect(() =>
    navigate(-1)
  , [navigate])

  return (
    <div>Wrong Web Address</div>
  )
}

export default ErrorComponent