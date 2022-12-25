import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { issuedBooks } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";
import ReturnCard from './ReturnCard';

import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const IssuedBooks = () => {
  const [bookID, setBookID] = useState('')
  const { issued, isLoading } = useSelector((state) => state.admin)
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
      dispatch(issuedBooks(bookID))
    }
  }

  return (
    <>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
        <TextField margin='none'
          id="outlined" type='search' placeholder='Search a Book by ID' onChange={(e) => setBookID(e.target.value)} value={bookID} />
        <Button onClick={handleSearch} startIcon={<SearchIcon />} variant='contained'>Search</Button>
      </Box>
      <Box>
        {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
        {JSON.stringify(issued) !== '{}' ? <ReturnCard book={issued} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Search a book by ID to Unissue</Typography></Box>}
      </Box>
    </>
  );
};
export default IssuedBooks;
