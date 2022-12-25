import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import { getSubscribers } from '../../features/admin/adminSlice'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Subscribers = () => {
  const { subscribers, isLoading } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  useEffect(() => {
    if (subscribers.length === 0) {
      dispatch(getSubscribers())
    }
  }, [])
  return (
    <>
      {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell align="right"><strong>Name</strong></TableCell>
              <TableCell align="right"><strong>Email</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber) => (
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
      </TableContainer>
    </>
  )
}

export default Subscribers