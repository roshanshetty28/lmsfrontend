import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { issuedBooks } from '../../features/admin/adminSlice'
import ReturnCard from './ReturnCard';

import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

const IssuedBooks = () => {
  const [bookID, setBookID] = useState('')
  const { issued, isLoading } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const handleSearch = () => {
    if (bookID === '') {
      alert('Enter a Book ID to Search')
    } else {
      dispatch(issuedBooks(bookID))
    }
  }

  return (
    <>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
        <TextField sx={{ mr: 1 }}
          id="issued-search-id" type='search' placeholder='Search a Book by ID' onChange={(e) => setBookID(e.target.value)} value={bookID} />
        <Button onClick={handleSearch} startIcon={<SearchIcon />} variant='contained'>Search</Button>
      </Box>
      <Box>
        {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> : null}
        {JSON.stringify(issued) !== '{}' ? <ReturnCard book={issued} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Search a book by ID to Unissue</Typography></Box>}
      </Box>
    </>
  );
};
export default IssuedBooks;
