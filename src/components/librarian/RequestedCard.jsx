import React from 'react'
import { useDispatch } from 'react-redux'
import { cancelRequest,issueBook } from '../../features/admin/adminSlice'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const RequestedCard = ({ book }) => {
    const dispatch = useDispatch()
    const handleIssue = (id)=>{
        dispatch(issueBook({ id: book._id, user_id: id }))
    }
    const handleCancel = (id) => {
        dispatch(cancelRequest({bookID:book._id,id:id}))
    }
    return (
        <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:&nbsp;{book.author}</Typography>
                <Typography>Genre:&nbsp;{book.genre.toString()}</Typography>
                <Typography>Rating:&nbsp;rating</Typography>
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
                            sx={{ m: 0.3 }}
                            color="success"
                            variant="contained"
                            size="small"
                            onClick={()=>handleIssue(user)}>
                            Issue
                        </Button>
                        <Button
                            sx={{ m: 0.5 }}
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleCancel(user)}>
                            Decline Request
                        </Button>
                    </Box>
                </Box>)}</Box>
            </CardContent>
        </Card>
    )
}

export default RequestedCard