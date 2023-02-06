import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { returnBook } from '../../features/admin/adminSlice'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const ReturnCard = ({ book }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.admin)
    const handleReturn = (userid) => {
        dispatch(returnBook({ id: book._id, userId: userid }))
    }
    return (
        <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:{book.author}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography>Rating:</Typography>
                    <Rating
                        name="half-rating"
                        value={book.rating}
                        precision={0.1}
                        readOnly /></Box>
                <Typography>Book ID:{book._id}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>{book.users.map((user, index) =>
                    <Box sx={{
                        borderRadius: '8px',
                        backgroundColor: 'pink',
                        boxShadow: '1px 2px #ed0970',
                        m: 0.5,
                        p: 0.5,
                        display: 'flex',
                        flexDirection: 'column'
                    }} key={index}>
                        <Typography>ID:&nbsp;{user.id}</Typography>
                        <Button disabled={isLoading === true ? true : false} size="small" variant='contained' onClick={() => handleReturn(user.id)}>{isLoading === false ? 'Un-Issue' : 'Un-Issuing...'}</Button>
                    </Box>)}</Box>
            </CardContent>
        </Card>
    )
}

export default ReturnCard