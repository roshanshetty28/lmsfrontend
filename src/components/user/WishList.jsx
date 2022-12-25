import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import { removefromWish, getWish } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const WishList = () => {
    const { isLoading, wishlist } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    const handleremove = (id) => {
        dispatch(removefromWish(id))
    }
    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(getWish())
        }
        return () => mounted = false
    }, [])
    return (
        <Box sx={{ m: 1, maxHeight: '76vh', display: 'flex', flexWrap: 'wrap' }}>
            {isLoading === true ?
                <ClipLoader size={150} cssOverride={override} loading={true} /> : (wishlist.length !== 0 ? wishlist.map((book, index) =>
                    <Card key={index} sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
                        <CardHeader sx={{ pb: 0 }} title={book.title}>
                        </CardHeader>
                        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                            <Typography>Author:{book.author}</Typography>
                            <Typography>Rating:rating</Typography>
                            <Typography>Book ID:{book._id}</Typography>
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