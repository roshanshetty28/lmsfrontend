import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bookDetails, relatedBooks } from '../../features/user/userSlice'
import { addToWish } from '../../features/user/userSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import BooksUser from './BooksUser';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const BookDetails = () => {
    const dispatch = useDispatch()
    const { book, isLoading, related } = useSelector((state) => state.user)
    const { bookId } = useParams()
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(bookDetails(bookId))
        }
        return () => mounted = false
    }, [])
    useEffect(() => {
        if (related.length === 0) { dispatch(relatedBooks({ genre: book.genre })) }
    }, [book])
    const handleAddWish = () => {
        const id = book._id.toString()
        dispatch(addToWish(id))
    }
    return (
        <>{isLoading === true ?
            <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
            <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
                <CardHeader sx={{ pb: 0 }} title={book.title} action={<IconButton onClick={handleAddWish}><AddIcon /></IconButton>}>
                </CardHeader>
                <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                    <Typography>Author:{book.author}</Typography>
                    <Typography>Rating:rating</Typography>
                    <Typography>Book ID:{book._id}</Typography>
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
            <Box>
                <Typography>Related Books</Typography>
                <Box sx={{ p: 1, mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {related.length === 0 ? 'No related Books' :
                        related.map((book, index) =>
                            <BooksUser book={book} key={index} />)
                    }
                </Box>
            </Box>
        </>
    )
}

export default BookDetails