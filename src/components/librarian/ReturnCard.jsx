import React from 'react'
import { useDispatch } from 'react-redux'
import { returnBook } from '../../features/admin/adminSlice'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ReturnCard = ({ book }) => {
    const dispatch = useDispatch()
    const handleReturn = (userid) => {
        dispatch(returnBook({ id: book._id, userId: userid }))
    }
    return (
        <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:{book.author}</Typography>
                <Typography>Rating:rating</Typography>
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
                        <Button size="small" variant='contained' onClick={() => handleReturn(user.id)}>Un-Issue</Button>
                    </Box>)}</Box>
            </CardContent>
        </Card>
    )
}

export default ReturnCard