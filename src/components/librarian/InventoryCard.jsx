import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, updateStock } from '../../features/admin/adminSlice'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';

const InventoryCard = ({ book }) => {
    const { isLoading } = useSelector((state) => state.admin)
    const [update, setUpdate] = useState(false)
    const [quantity, setQuantity] = useState('')
    const [action, setAction] = useState('')
    const dispatch = useDispatch()
    const handleQuantity = () => {
        if (update) {
            if (quantity === '') {
                alert('Enter Quantity to update')
                setUpdate(false)
            } else if (action === '') {
                alert('Select an Action')
                setUpdate(false)
            } else {
                setUpdate(false)
                dispatch(updateStock({ id: book._id, quantity: quantity, action: action }))
            }
        } else {
            setUpdate(true)
        }
    }
    const handleDelete = () => {
        dispatch(deleteBook(book._id))
    }
    return (
        <Card sx={{ p: 1, m: 1, pr: 2, pl: 0, minWidth: 240, backgroundColor: '#84ceeb', boxShadow: '1px 2px #3f48f2' }}>
            <CardHeader sx={{ pb: 0 }} title={book.title}>
            </CardHeader>
            <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
                <Typography>Author:&nbsp;{book.author}</Typography>
                <Typography>Genre:&nbsp;{book.genre.toString()}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography>Rating:</Typography>
                    <Rating
                        name="half-rating"
                        value={book.rating}
                        precision={0.1}
                        readOnly
                    />
                    <Typography>{book.rating}</Typography></Box>
                <Typography>Book ID:&nbsp;{book._id}</Typography>
                <Typography>Stock:&nbsp;{book.stock}</Typography>
            </CardContent>
            <Collapse in={update} timeout="auto" unmountOnExit>
                <CardContent>
                    <TextField
                        sx={{ p: 0, m: 0 }}
                        required
                        margin='none'
                        id="outlined-required"
                        label="Quantity"
                        type='number'
                        InputProps={{ inputProps: { min: 1 } }}
                        value={quantity}
                        onChange={(e) => { setQuantity(e.target.value) }}
                    />
                    <Box sx={{ mt: 1, minWidth: 120 }}>
                        <FormControl>
                            <InputLabel id="inv-card-label" >Action:</InputLabel>
                            <Select sx={{ width: 150 }} label="Action" labelId="demo-simple-select-label" id="inv" value={action} onChange={(e) => setAction(e.target.value)}>
                                <MenuItem value="add">Add</MenuItem>
                                <MenuItem value="subtract">Subtract</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Collapse>
            <CardActions sx={{ m: 0, p: 0, ml: 2, mb: 1 }}>
                <Button disabled={isLoading === true ? true : false} variant='outlined' color='error' onClick={handleDelete}>{isLoading === false ? 'Delete Book' : 'Deleting...'}</Button>
                <Button disabled={isLoading === true ? true : false} variant='contained' onClick={handleQuantity}>{isLoading === false ? 'Update Quantity' : 'Updating...'}</Button>
            </CardActions>

        </Card>
    );
}

export default InventoryCard