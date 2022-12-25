import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser,block,unblock } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

const UserDetails = () => {
    const { users, isLoading } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const override = {
        display: "block",
        margin: "40%",
        borderColor: "white",
    };
    const handleDelete = (id) => {
        window.confirm("User Will be Permanently Deleted")
        dispatch(deleteUser(id))
    }
    const handleBlock = (id) => {
        window.confirm('User will be blocked')
        dispatch(block(id))
    }
    const handleUnBlock=(id)=>{
        window.confirm('User will be unblocked')
        dispatch(unblock(id))
    }
    useEffect(() => {
        if (users.length === 0) {
            dispatch(allUsers())
        }
    }, [])

    return (
        <>{isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
            <Box sx={{ p: 1, maxHeight: '76vh', display: 'flex', flexWrap: 'wrap' }}>
                {users.map((user, index) =>
                    <Card key={index} sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
                        <CardHeader sx={{ pb: 0 }} title={user.name}>
                        </CardHeader>
                        <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                            <Typography>{user.email}</Typography>
                            <Typography>{user._id}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleDelete(user._id)} sx={{ backgroundColor: '#e895a2', '&:hover': { backgroundColor: '#e35d73' } }} variant="contained" startIcon={<DeleteIcon style={{ color: 'red' }} />}>
                                Delete
                            </Button>
                            {user.blocked === false ?
                                <Button sx={{ color: 'white', backgroundColor: '#e895a2', '&:hover': { backgroundColor: '#e35d73' } }} onClick={() => handleBlock(user._id)} variant="contained" startIcon={<BlockIcon style={{ color: 'red' }} />}>Block</Button> :
                                <Button sx={{ color: 'white', backgroundColor: '#9bed93', '&:hover': { backgroundColor: '#5ad14f' } }} onClick={() => handleUnBlock(user._id)} variant="contained" startIcon={<BlockIcon style={{ color: '#31b825' }} />}>Unblock</Button>}
                        </CardActions>
                    </Card>
                )}
            </Box>
        </>
    )
}

export default UserDetails