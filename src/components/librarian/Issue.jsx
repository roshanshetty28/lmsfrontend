import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unIssuedBooks } from '../../features/admin/adminSlice'
import IssueCard from './IssueCard';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

const Issue = () => {
  const [bookID, setBookID] = useState('')
  const { unissued, isLoading } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const handleSearch = () => {
    if (bookID === '') {
      alert('Enter a Book ID to Search')
    } else {
      dispatch(unIssuedBooks(bookID))
    }
  }

  return (
    <>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
        <TextField sx={{ mr: 1 }}
          id="issue-search" type='search' placeholder='Search a Book by ID' onChange={(e) => setBookID(e.target.value)} value={bookID} />
        <Button disabled={isLoading === true ? true : false} onClick={handleSearch} startIcon={<SearchIcon />} variant='contained'>{isLoading === false ? 'Search' : 'Searching...'}</Button>
      </Box>
      <div>
        {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> : null}
        {JSON.stringify(unissued) !== '{}' ? <IssueCard book={unissued} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Search a book by ID to Issue</Typography></Box>}
      </div>
    </>
  );
};
export default Issue;
