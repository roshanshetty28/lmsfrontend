import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestedBooks } from '../../features/user/userSlice'
import BooksUser from './BooksUser'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const UserRequested = () => {
    const dispatch = useDispatch()
    const { requested, isLoading } = useSelector((state) => state.user)
    useEffect(() => {
        if(requested.length===0){
            const promise = dispatch(requestedBooks()) 
            return () => promise.abort()
        }
    }, [])
    return (
        <>
            {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <CircularProgress thickness={1} size={200} /> </Box> :
                <Box>
                    {requested.length === 0 ? <Typography sx={{ textAlign: 'center' }}>You have No Books requested</Typography> :
                        <Box sx={{ p: 1, mt: 1, display: 'flex', flexWrap: 'wrap' }}>{requested.map((book, index) =>
                            <BooksUser book={book} key={index} />
                        )}</Box>
                    }
                </Box>
            }
        </>
    )
}

export default UserRequested