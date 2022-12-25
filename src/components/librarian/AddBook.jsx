import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addBook } from '../../features/admin/adminSlice'

import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

const AddBook = () => {
  const dispatch = useDispatch()
  const categories = [
    { id: 1, type: 'action' },
    { id: 2, type: 'drama' },
    { id: 3, type: 'romance' },
    { id: 4, type: 'sci - fi' },
    { id: 5, type: 'comedy' },
  ];
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [total, setTotal] = useState("")
  const [rating, setRating]=useState("")
  const handleChange = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((sel) => sel !== e.target.value));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (author === '' || title === '' || total === ''||rating==='') {
      alert('Enter all details')
    } else if (selected.length === 0) {
      alert('Select a Genre')
    } else {
      const data = { author: author, title: title, genre: selected, total: total,rating:rating }
      dispatch(addBook(data))
    }
  };
  return (
    <Box sx={{ m: 2, p: 2, border: '1px solid black', borderRadius: '8px' }}>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          id="outlined-required"
          label="Author"
          value={author}
          onChange={(e) => { setAuthor(e.target.value) }}
        />
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          id="outlined-required"
          label="Rating"
          value={rating}
          onChange={(e) => { setRating(e.target.value) }}
        />
      </Box>
      <Box sx={{ border: '0.1px solid #a6bfbc', borderRadius: '5px', m: 1, width: 222,display:'flex',flexDirection:'column' }}>
        <Typography variant='p' sx={{p:1,color:'grey'}}>
          Genre *
        </Typography>
        <FormGroup >
          {categories.map((cat) => (
            <FormControlLabel
              onChange={handleChange}
              key={cat.id}
              value={cat.type}
              control={<Checkbox sx={{ pl: 2 }} />}
              label={cat.type}
            />
          ))}
        </FormGroup>
      </Box>
      <Box sx={{ m: 1 }}>
        <TextField
          required
          type='number'
          InputProps={{ inputProps: { min: 1 } }}
          id="outlined-required"
          label="Total Books"
          value={total}
          onChange={(e) => { setTotal(e.target.value) }}
        />
      </Box>
      <Box sx={{ pl: 1 }}>
        <Button sx={{ backgroundColor: '#89e681', '&:hover': { backgroundColor: '#5ad14f' } }} variant='contained' onClick={handleSubmit} startIcon={<AddCircleOutlineIcon />}>Add Book</Button>
      </Box>
    </Box>
  );
};
export default AddBook;
