import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reqBooks } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import RequestedCard from './RequestedCard';

const Requested = () => {
  const dispatch = useDispatch()
  const { requestedBooks, isLoading } = useSelector((state) => state.admin)
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  useEffect(() => {
    if (requestedBooks.length === 0) {
      dispatch(reqBooks())
    }
  }, []);

  return (
    <>
      <Box sx={{ mt: 2,display:'flex', flexWrap:'wrap' }}>
        {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
        {requestedBooks.length > 0 ? requestedBooks.map((book, index) => (
          <RequestedCard book={book} key={index}/>)) : <div style={{ border: '1px solid black', width: '100%', textAlign: 'center' }}>No Requested Books</div>}
      </Box>
    </>
  )
}

export default Requested