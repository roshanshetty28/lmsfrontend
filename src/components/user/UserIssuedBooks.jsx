import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIssuedBooks } from '../../features/user/userSlice'
import BooksUser from './BooksUser';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const UserIssuedBooks = () => {
  const { userIssued, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const promise = dispatch(getIssuedBooks())
    return () => promise.abort()
  }, []);

  return (
    <>
      {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <CircularProgress thickness={1} size={200} /> </Box> :
        <Box>
          {userIssued.length === 0 ? <Typography sx={{ textAlign: 'center' }}>You have Not Issued any Books</Typography> : userIssued.map((book, index) =>
            <BooksUser book={book} key={index} />
          )}
        </Box>
      }
    </>
  )
}

export default UserIssuedBooks