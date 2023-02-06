import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dueBooks } from '../../features/admin/adminSlice'
import ReactPaginate from 'react-paginate';
import Book from './DueBookCard';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const DueBooks = () => {
    const limit = 5;
    const { isLoading, duebooks } = useSelector((state) => state.admin)
    const [curPage, setcurPage] = useState(1)
    const dispatch = useDispatch()
    const handlePageClick = (data) => {
        setcurPage(data.selected + 1);
    }
    useEffect(() => {
        const data = { page: curPage }
        const promise = dispatch(dueBooks(data))
        return () => promise.abort()
    }, [curPage])

    return (
        <>
            <Box>
                {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> :
                    <Box sx={{ p: 1, mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                        {duebooks.books.length !== 0 ? duebooks.books.map((book, index) =>
                            <Book key={index} book={book} />) : <Typography sx={{ width: '100%', textAlign: 'center' }}>No Due Books</Typography>}
                    </Box>
                }
            </Box>
            <Box>
                {duebooks.books.length !== 0 ? <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'....'}
                    pageCount={Math.ceil(duebooks.total / limit)}
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

export default DueBooks