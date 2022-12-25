import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BooksUser from './BooksUser'
import { requestedBooks } from '../../features/user/userSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const UserRequested = () => {
    const dispatch = useDispatch()
    const { requested, isLoading } = useSelector((state) => state.user)
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    useEffect(() => {
        let mounted = true
        if (mounted) { dispatch(requestedBooks()) }
        return () => mounted = false
    }, [])
    return (
        <>
            {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
            <Box>
                {requested.length === 0 ? <Typography sx={{ textAlign: 'center' }}>You have No Books requested</Typography> : requested.map((book, index) =>
                    <BooksUser book={book} key={index} />
                )}
            </Box>
        </>
    )
}

export default UserRequested