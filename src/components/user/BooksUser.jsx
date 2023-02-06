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
import Tooltip from '@mui/material/Tooltip';

const BooksUser = ({ book }) => {
  const { user } = useSelector((state) => state.auth)
  const {userIssued}= useSelector((state)=>state.user)
  const [option, setOption] = useState(true)
  const [request, setRequest] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRequest = () => {
    if (window.confirm(`Do want to request "${book.title}"`)) {
      const id = book._id.toString()
      dispatch(requestBook(id))
      setRequest(false)
    }
  }
  const handleCancelRequest = () => {
    if (window.confirm(`Do want to cancel request for "${book.title}"`)) {
      const id = book._id.toString()
      dispatch(cancelRequest(id))
      setRequest(true)
    }
  }
  const handleView = () => {
    // navigate('../' + book._id)
    // window.location.reload()
    window.open('https://librarymngsys.netlify.app/users/' + book._id, "_blank")
  }
  const handleAddWish = () => {
    const id = book._id.toString()
    dispatch(addToWish(id))
  }
  useEffect(() => {
    if (user.issued.includes(book._id)) {
      setOption(false)
    }
    let req = book.requestedUsers.filter(u => u === user._id)
    if (req.length !== 0) {
      setRequest(false)
    }
  }, [])
  return (
    <Box sx={{ mt: 2 }}>
      <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
        <CardHeader sx={{ pb: 0 }} title={book.title} action={<Tooltip title="Add to Wishlist"><IconButton onClick={handleAddWish}><AddIcon /></IconButton></Tooltip>}>
        </CardHeader>
        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
          <Typography>Author:&nbsp;{book.author}</Typography>
          <Typography>Genre:&nbsp;{book.genre.toString()}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>Rating:&nbsp;</Typography>
            <Rating
              name="half-rating"
              value={book.rating}
              precision={0.1}
              readOnly
            /></Box>
          <Typography>Book ID:&nbsp;{book._id}</Typography>
          <Typography>Due Date:&nbsp;{book.users.map((b)=>Date(b.dueDate).toLocaleString().slice(4,15))}</Typography>
        </CardContent>
        <CardActions>
          <Button variant='outlined' onClick={handleView}>View</Button>
          {option === true ? <>
            {request === true ? <Button variant='contained' onClick={handleRequest}>Request</Button> :
              <Button variant='contained' onClick={handleCancelRequest}>Cancel Request</Button>}
          </> : null}
        </CardActions>
      </Card>
    </Box>
  )
}

export default BooksUser