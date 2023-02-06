import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockedUsers, block, unblock } from '../../features/admin/adminSlice'
import ReactPaginate from 'react-paginate';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BlockIcon from '@mui/icons-material/Block';
import CircularProgress from '@mui/material/CircularProgress';

const BlockedUsers = () => {
    const limit = 5
    const [curPage, setcurPage] = useState(1)
    const { blocked, isLoading } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const handleBlock = (id) => {
        window.confirm('User will be blocked')
        dispatch(block(id))
    }
    const handleUnBlock = (id) => {
        window.confirm('User will be unblocked')
        dispatch(unblock(id))
    }
    const handlePageClick = (data) => {
        setcurPage(data.selected + 1);
    }
    useEffect(() => {
        const data = { page: curPage }
        const promise = dispatch(blockedUsers(data))
        return () => promise.abort()
    }, [curPage])

    return (
        <>
            {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> : <Box sx={{ p: 1, maxHeight: '76vh', display: 'flex', flexWrap: 'wrap' }}>
                {blocked.users.length !== 0 ? blocked.users.map((user, index) =>
                    <Card key={index} sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
                        <CardHeader sx={{ pb: 0 }} title={user.name}>
                        </CardHeader>
                        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                            <Typography>{user.email}</Typography>
                            <Typography>{user._id}</Typography>
                        </CardContent>
                        <CardActions>
                            {user.blocked === false ?
                                <Button sx={{ color: 'white', backgroundColor: '#e895a2', '&:hover': { backgroundColor: '#e35d73' } }} onClick={() => handleBlock(user._id)} variant="contained" startIcon={<BlockIcon style={{ color: 'red' }} />}>Block</Button> :
                                <Button sx={{ color: 'white', backgroundColor: '#9bed93', '&:hover': { backgroundColor: '#5ad14f' } }} onClick={() => handleUnBlock(user._id)} variant="contained" startIcon={<BlockIcon style={{ color: '#31b825' }} />}>Unblock</Button>}
                        </CardActions>
                    </Card>
                ) : <Typography sx={{ width: '100%', textAlign: 'center' }}>No Users</Typography>}
            </Box>}
            <Box>
                {blocked.total !== 0 ? <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'....'}
                    pageCount={Math.ceil(blocked.total / limit)}
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

export default BlockedUsers