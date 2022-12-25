import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Book from './DueBookCard';
import { dueBooks } from '../../features/admin/adminSlice'

import Box from '@mui/material/Box';

const DueBooks = () => {
    const { isLoading, duebooks } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    useEffect(() => {
        let rendered = false
        if (rendered === false) {
            dispatch(dueBooks())
        }
        return () => rendered = true
    }, [])
    return (
        <>{isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> :
            <Box sx={{ p: 1, mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                {duebooks.map((book, index) =>
                    <Book key={index} book={book} />)}
            </Box>}

        </>
    )
}

export default DueBooks