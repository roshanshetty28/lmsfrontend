import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribers } from '../../features/admin/adminSlice'
import ReactPaginate from 'react-paginate';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Subscribers = () => {
  const limit = 10
  const { subscribers, isLoading } = useSelector((state) => state.admin)
  const [curPage, setcurPage] = useState(1)
  const dispatch = useDispatch()
  const handlePageClick = (data) => {
    setcurPage(data.selected + 1);
  }
  useEffect(() => {
    const data = { page: curPage }
    const promise = dispatch(getSubscribers(data))
    return () => promise.abort()
  }, [curPage])
  return (
    <>
      {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> : <>{subscribers.users.length !== 0 ? <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell align="right"><strong>Name</strong></TableCell>
              <TableCell align="right"><strong>Email</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.users.map((subscriber) => (
              <TableRow
                key={subscriber._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {subscriber._id}
                </TableCell>
                <TableCell align="right">{subscriber.name}</TableCell>
                <TableCell align="right">{subscriber.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <Typography sx={{ width: '100%', textAlign: 'center' }}>No Subscribers</Typography>}
      </>
      }
      <Box>
        {subscribers.users.length !== 0 ? <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'....'}
          pageCount={Math.ceil(subscribers.total / limit)}
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
          activeClassName={'active'}
        /> : null}
      </Box>
    </>
  )
}

export default Subscribers