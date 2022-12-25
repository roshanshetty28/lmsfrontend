import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestBook, cancelRequest, addToWish } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';

const BooksUser = ({ book }) => {
  const { user } = useSelector((state) => state.auth)
  const [option, setOption] = useState(true)
  const [request, setRequest] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRequest = () => {
    if (window.confirm(`Do want to request "${book.title}"`)) {
      const id = book._id.toString()
      dispatch(requestBook(id))
    }
  }
  const handleCancelRequest = () => {
    if (window.confirm(`Do want to cancel request for "${book.title}"`)) {
      const id = book._id.toString()
      dispatch(cancelRequest(id))
    }
  }
  const handleView = () => {
    navigate('../' + book._id)
    window.location.reload()
  }
  const handleAddWish = () => {
    const id = book._id.toString()
    dispatch(addToWish(id))
  }
  useEffect(() => {
    let mounted = true
    if (mounted === true) {
      if (user.issued.includes(book._id)) {
        setOption(false)
      }
      if (book.requestedUsers.filter(u => u === user._id).length !== 0) {
        setRequest(false)
      }
    }
    return () => mounted = false
  }, [])
  return (
    <Box sx={{ mt: 2 }}>
      <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
        <CardHeader sx={{ pb: 0 }} title={book.title} action={<IconButton onClick={handleAddWish}><AddIcon /></IconButton>}>
        </CardHeader>
        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
          <Typography>Author:&nbsp;{book.author}</Typography>
          <Typography>Genre:&nbsp;{book.genre.toString()}</Typography>
          <Box sx={{display: 'flex',flexDirection: 'row'}}>
            <Typography>Rating:&nbsp;</Typography>
            <Rating
            name="half-rating"
            value={book.rating}
            precision={0.1}
            readOnly
          /></Box>
          <Typography>Book ID:&nbsp;{book._id}</Typography>
        </CardContent>
        <CardActions>
          <Button variant='outlined' onClick={handleView}>View</Button>
          {option && <>
            {request === true ? <Button variant='contained' onClick={handleRequest}>Request</Button> :
              <Button variant='contained' onClick={handleCancelRequest}>Cancel Request</Button>}
          </>}
        </CardActions>
      </Card>
    </Box>
  )
}

export default BooksUser