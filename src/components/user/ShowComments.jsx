import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, modifyComment } from '../../features/user/userSlice'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';

const ShowComments = ({ comment }) => {
    const [edit, setEdit] = useState(false)
    const { book } = useSelector((state) => state.user)
    const { user } = useSelector((state) => state.auth)
    const [updatedComment, setUpdatedComment] = useState('')
    const dispatch = useDispatch()
    const handleDeleteComment = () => {
        dispatch(deleteComment({ id: comment._id, bookID: book._id }))
    }
    const handleEdit = () => {
        setEdit(true)
    }
    const handleSave = () => {
        setEdit(false)
        if (comment.comment !== updatedComment) {
            dispatch(modifyComment({ bookID: book._id, comment: updatedComment, commentID: comment._id }))
        }
    }
    useEffect(() => {
        setUpdatedComment(comment.comment)
    }, [])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '80%', alignItems: 'baseline', ml: 1 }}>
                <Typography><strong>{comment.userName}</strong>:&nbsp;</Typography>
                {edit === false ? <Box style={{ wordWrap: 'break-word' }} sx={{ overflow: 'hidden' }}>{comment.comment}</Box> :
                    <TextField multiline style={{ width: "100%", fontSize: 15 }} id="comment-textfield" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} autoFocus onFocus={function (e) {
                        var val = e.target.value;
                        e.target.value = '';
                        e.target.value = val;
                    }} />}
            </Box>
            {comment.userID === user._id ?
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {edit === false ?
                        <Tooltip title="Edit Comment">
                            <IconButton onClick={handleEdit}><EditIcon color='primary' /></IconButton>
                        </Tooltip> : <Tooltip title="Save">
                            <IconButton onClick={handleSave}><DoneIcon color='success' /></IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="Delete Comment">
                        <IconButton onClick={handleDeleteComment}><DeleteIcon color='error' /></IconButton>
                    </Tooltip>
                </Box>
                : null}
        </Box>
    )
}

export default ShowComments