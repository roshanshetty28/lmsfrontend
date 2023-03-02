import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { bookDetails, relatedBooks, getComments, addReview, getEbook } from '../../features/user/userSlice'
import { addToWish } from '../../features/user/userSlice'
import { reviewValidation } from '../../schema/UserSchema'
import ReactPaginate from 'react-paginate';
import BooksUser from './BooksUser';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import ShowComments from './ShowComments'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import AddIcon from '@mui/icons-material/Add';

const initialValues = {
    comment: "",
    rating: 2
}

const BookDetails = () => {
    const limit = 5
    const dispatch = useDispatch()
    const { bookId } = useParams()
    const [curPage, setcurPage] = useState(1)
    const [option, setOption] = useState(true)
    const [writeReview, setWriteReview] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { book, isLoading, related, comments, ebook } = useSelector((state) => state.user)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: reviewValidation,
        onSubmit: (values, { resetForm }) => {
            dispatch(addReview({ ...values, userName: user.name, bookID: book._id }))
            resetForm()
        }
    })
    useEffect(() => {
        const promise = dispatch(bookDetails(bookId))
        return () => promise.abort()
    }, [])
    useEffect(() => {
        let promise1, promise2
        if (book._id !== undefined && related.total === 0) {
            promise1 = dispatch(getComments(book._id))
            promise2 = dispatch(relatedBooks({ genre: book.genre, page: curPage }))
        }
        return () => {
            promise1?.abort()
            promise2?.abort()
        }
    }, [book, curPage])
    useEffect(() => {
        if (book._id !== undefined && user.issued.includes(book._id)) {
            setOption(false)
        }
    }, [book])
    const handleWriteReview = () => {
        setWriteReview(!writeReview)
    }
    const handleAddWish = () => {
        const id = book._id.toString()
        dispatch(addToWish(id))
    }
    const handlePageClick = (data) => {
        setcurPage(data.selected + 1);
    }
    const handlePreview = () => {
        const id = book._id.toString()
        window.open("https://librarymngsys.netlify.app/e-book/" + id, "_blank")
    }
    return (
        <>
            {isLoading === true ?
                <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> :
                <Card sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, mb: 2, backgroundColor: '#84ceeb' }}>
                    <Box sx={{ width: { md: '50%', xs: '100%' }, border: '1px solid', display: 'flex', flexDirection: 'column', pl: 1 }}>
                        {/* <Box>Img</Box>
                        <Divider /> */}
                        <Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography variant='h4'>{book.title}</Typography>
                                <Box sx={{ m: 1 }}><IconButton onClick={handleAddWish}><AddIcon /></IconButton></Box>
                            </Box>
                            <Typography>Author:&nbsp;{book.author}</Typography>
                            <Typography>Genre:&nbsp;{book.genre}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography>Rating:&nbsp;</Typography>
                                <Rating
                                    name="details-rating"
                                    value={Number(book.rating)}
                                    precision={0.1}
                                    readOnly />
                            </Box>
                            <Typography>Book ID:&nbsp;{book._id}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button sx={{ my: 2 }} variant='contained' disabled={book.ebook == null || option === true} onClick={handlePreview}>Preview E-Book</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: { md: '50%', xs: '100%' } }}>
                        <Box sx={{ backgroundColor: 'inherit', border: '1px solid' }}>
                            <CardHeader sx={{ pb: 0, mb: 1.5 }} title={"Ratings & Reviews"} action={<Button disabled={user.readBooks.includes(book._id) === true ? false : true} variant='outlined' onClick={handleWriteReview}>{writeReview === false ? 'Write a Review' : 'Close'}</Button>}>
                            </CardHeader>
                            <Collapse in={writeReview} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Box>
                                        <TextareaAutosize
                                            minRows={3}
                                            placeholder="Comment"
                                            id='rewiew-comment'
                                            name='comment'
                                            style={{ fontSize: 17, width: '100%', borderRadius: 5, borderColor: errors.comment && touched.comment ? 'red' : '#bfbdb8' }}
                                            value={values.comment}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Typography sx={{ fontSize: 12, pl: 2, color: 'red' }}>{errors.comment && touched.comment ? errors.comment : null}</Typography>
                                    </Box>
                                    <Box>
                                        <Rating
                                            size='large'
                                            id='review-rating'
                                            name="rating"
                                            precision={0.1}
                                            value={Number(values.rating)}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <Typography sx={{ fontSize: 12, pl: 2, color: 'red' }}>{errors.rating && touched.rating ? errors.rating : null}</Typography>
                                    </Box>
                                    <Box><Button disabled={isLoading === true ? true : false} onClick={handleSubmit} variant='contained'>{isLoading === false ? 'Submit' : 'Submitting...'}</Button></Box>
                                </CardContent>
                            </Collapse>
                        </Box>
                        <Box>
                            <Box sx={{ minHeight: '120px', maxHeight: '200px', border: '1px solid', overflowY: 'auto' }}>
                                {comments.length === 0 ? <Typography sx={{ textAlign: 'center' }}>No Reviews</Typography> :
                                    <>{comments.map((comment, index) =>
                                        <ShowComments comment={comment} key={index} />)}
                                    </>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Card>}
            <Divider />
            <Box>
                <Typography variant='h6' sx={{ ml: 1 }}>Related Books</Typography>
                <Box sx={{ p: 0.8, display: 'flex', flexWrap: 'wrap' }}>
                    {related.books.length === 0 ? <Typography sx={{ width: '100%', textAlign: 'center' }}>No related Books</Typography> :
                        related.books.map((book, index) =>
                            <BooksUser book={book} key={index} />)
                    }
                </Box>
                <Box>
                    {related.books.length !== 0 ? <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'....'}
                        pageCount={Math.ceil(related.total / limit)}
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
            </Box>
        </>
    )
}

export default BookDetails