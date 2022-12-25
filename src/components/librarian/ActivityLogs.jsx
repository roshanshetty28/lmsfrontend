import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activityLogs } from '../../features/admin/adminSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ActivityLogs = () => {
  const dispatch = useDispatch()
  const { logs } = useSelector((state) => state.admin)
  useEffect(() => {
    let mounted = true
    if (mounted) {
      dispatch(activityLogs())
    }
    return () => mounted = false
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Action</strong></TableCell>
            <TableCell align="right"><strong>User ID</strong></TableCell>
            <TableCell align="right"><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {log.action}
              </TableCell>
              <TableCell align="right">{log.user}</TableCell>
              <TableCell align="right">{log.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ActivityLogs