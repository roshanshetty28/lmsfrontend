import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { issueBook } from '../../features/admin/adminSlice'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';

const IssueCard = ({ book }) => {
    const [issue, setIssue] = useState(false)
    const [userid, setId] = useState('')
    const dispatch = useDispatch()
    const handleIssue = () => {
        if (issue) {
            if (userid === '') {
                alert('Enter a User ID to Issue')
                setIssue(false)
            } else {
                dispatch(issueBook({ id: book._id, user_id: userid }))
                setIssue(false)
            }
        }
        else { setIssue(true) }
    }
    return (
        <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:{book.author}</Typography>
                <Typography>Rating:rating</Typography>
                <Typography>Book ID:{book._id}</Typography>
            </CardContent>
            <Collapse in={issue} timeout="auto" unmountOnExit>
                <CardContent>
                    <TextField
                        sx={{ p: 0, m: 0 }}
                        required
                        margin='none'
                        id="outlined-required"
                        label="User ID"
                        type='text'
                        value={userid}
                        onChange={(e) => { setId(e.target.value) }}
                    />
                </CardContent>
            </Collapse>
            <CardActions sx={{ m: 0, p: 0, ml: 2, mb: 1 }}>
                <Button variant='contained' onClick={handleIssue}>Issue</Button>
            </CardActions>
        </Card>
    )
}

export default IssueCard