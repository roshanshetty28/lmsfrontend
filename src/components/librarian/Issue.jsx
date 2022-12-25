import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unIssuedBooks } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";
import IssueCard from './IssueCard';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Issue = () => {
  const [bookID, setBookID] = useState('')
  const { unissued, isLoading } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
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
        <TextField margin='none'
          id="outlined" type='search' placeholder='Search a Book by ID' onChange={(e) => setBookID(e.target.value)} value={bookID} />
        <Button onClick={handleSearch} startIcon={<SearchIcon />} variant='contained'>Search</Button>
      </Box>
      <div>
        {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
        {JSON.stringify(unissued) !== '{}' ? <IssueCard book={unissued} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Search a book by ID to Issue</Typography></Box>}
      </div>
    </>
  );
};
export default Issue;
