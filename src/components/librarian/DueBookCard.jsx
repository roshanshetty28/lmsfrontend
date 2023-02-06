import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifyBookDefaulties } from "../../features/admin/adminSlice"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DueBook = ({ book }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.admin)
  const handleNotify = () => {
    let users = []
    book.users.map((user) => users.push(user.id))
    dispatch(notifyBookDefaulties({ users: users, bookID: book._id, title: book.title }))
  }
  return (
    <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
      <CardHeader sx={{ pb: 0 }} title={book.title}>
      </CardHeader>
      <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
        <Typography>Author:{book.author}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>Rating:</Typography>
          <Rating
            name="half-rating"
            value={book.rating}
            precision={0.1}
            readOnly /></Box>
        <Typography>Book ID:{book._id}</Typography>
        <Box>
          <Typography>Defaulters:</Typography>
          {book.users.map((user, index) =>
            <Box sx={{
              borderRadius: '8px',
              backgroundColor: 'pink',
              boxShadow: '1px 2px #ed0970',
              m: 0.5,
              p: 0.5,
              display: 'flex',
              flexDirection: 'column'
            }} key={index}>
              <Typography>ID:&nbsp;{user.id}</Typography>
              <Typography>Due Date:&nbsp;{(new Date()).toString().split(' ').splice(1,3).join(' ')}</Typography>
            </Box>)}
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button disabled={isLoading === true ? true : false} variant="contained" onClick={handleNotify}>{isLoading === false ? 'Notify' : 'Notifying...'}</Button>
      </CardActions>
    </Card>
  );
};
export default DueBook;
