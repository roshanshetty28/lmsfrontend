import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removefromWish, getWish } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';

const WishList = () => {
    const { isLoading, wishlist } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleremove = (id) => {
        dispatch(removefromWish(id))
    }
    useEffect(() => {
        if (wishlist.length === 0) {
            const promise = dispatch(getWish())
            return () => promise.abort()
        }
    }, [])
    return (
        <Box sx={{ m: 1, maxHeight: '76vh', display: 'flex', flexWrap: 'wrap' }}>
            {isLoading === true ?
                <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <CircularProgress thickness={1} size={200} /> </Box> : (wishlist.length !== 0 ? wishlist.map((book, index) =>
                    <Card key={index} sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
                        <CardHeader sx={{ pb: 0 }} title={book.title}>
                        </CardHeader>
                        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                            <Typography>Author:&nbsp;{book.author}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography>Rating:&nbsp;</Typography>
                                <Rating
                                    name="details-rating"
                                    value={book.rating}
                                    precision={0.1}
                                    readOnly />
                            </Box>
                            <Typography>Book ID:&nbsp;{book._id}</Typography>
                        </CardContent>
                        <CardActions sx={{ ml: 1 }}>
                            <Button onClick={() => handleremove(book._id)} color='error' variant="outlined" startIcon={<DeleteIcon color='error' />}>
                                Remove from Wishlist
                            </Button>
                        </CardActions>
                    </Card>
                ) : <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}><Typography sx={{ textAlign: 'center' }}>No Books in your wishlist</Typography></Box>
                )}
        </Box>
    )
}

export default WishList