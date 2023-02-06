import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelRequest, issueBook, reqBooks } from '../../features/admin/adminSlice'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const RequestedCard = ({ book, page }) => {
    const { isLoading } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const handleIssue = (id) => {
        dispatch(issueBook({ id: book._id, user_id: id }))
        const data = { page: page }
        dispatch(reqBooks(data))
    }
    const handleCancel = (id) => {
        dispatch(cancelRequest({ bookID: book._id, id: id }))
    }
    return (
        <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:&nbsp;{book.author}</Typography>
                <Typography>Genre:&nbsp;{book.genre.toString()}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography>Rating:</Typography>
                    <Rating
                        name="half-rating"
                        value={book.rating}
                        precision={0.1}
                        readOnly /></Box>
                <Typography>Book ID:&nbsp;{book._id}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{book.requestedUsers.map((user, index) => <Box key={index}
                    sx={{
                        border: '0px solid black',
                        borderRadius: '8px',
                        backgroundColor: 'pink',
                        boxShadow: '1px 2px #ed0970', m: 0.5, p: 0.5,
                    }}>
                    <Typography sx={{ textAlign: 'center' }}>ID:&nbsp;{user}</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}>
                        <Button
                            disabled={isLoading === true ? true : false}
                            sx={{ m: 0.3 }}
                            color="success"
                            variant="contained"
                            size="small"
                            onClick={() => handleIssue(user)}>
                            {isLoading === false ? 'Issue' : 'Issuing...'}
                        </Button>
                        <Button
                            disabled={isLoading === true ? true : false}
                            sx={{ m: 0.5 }}
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleCancel(user)}>
                            {isLoading === false ? 'Decline Request' : 'Declining...'}
                        </Button>
                    </Box>
                </Box>)}
                </Box>
            </CardContent>
        </Card>
    )
}

export default RequestedCard