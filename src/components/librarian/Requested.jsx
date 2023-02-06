import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reqBooks } from '../../features/admin/adminSlice'
import ReactPaginate from 'react-paginate';

import Box from '@mui/material/Box';
import RequestedCard from './RequestedCard';
import CircularProgress from '@mui/material/CircularProgress';

const Requested = () => {
  const limit = 5;
  const dispatch = useDispatch()
  const [curPage, setcurPage] = useState(1)
  const { requestedBooks, isLoading } = useSelector((state) => state.admin)
  useEffect(() => {
    const data = { page: curPage }
    const promise = dispatch(reqBooks(data))
    return () => promise.abort()
  }, [curPage]);
  const handlePageClick = (data) => {
    setcurPage(data.selected + 1);
  }
  return (
    <>
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
        {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> : <>
          {requestedBooks.books.length !== 0 ? requestedBooks.books.map((book, index) => (
            <RequestedCard book={book} key={index} page={curPage} />)) : <Box sx={{ width: '100%', textAlign: 'center' }}>No Requested Books</Box>}
        </>}
      </Box>
      <Box>
        {requestedBooks.books.length !== 0 ? <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'....'}
          pageCount={Math.ceil(requestedBooks.total / limit)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          breakClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
          activeClassName={'activePage'}
        /> : null}
      </Box>
    </>
  )
}

export default Requested