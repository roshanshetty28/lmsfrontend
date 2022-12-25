import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

const DueBookBook = ({ book }) => {

  return (
       <Card sx={{ m: 1, mb: 2, minWidth: 240, backgroundColor: '#d3e5f2', boxShadow: '1px 2px #3f48f2' }}>
          <CardHeader sx={{ pb: 0 }} title={book.title}>
          </CardHeader>
          <CardContent sx={{ mt: 0, pt: 0, pb: 0 }}>
            <Typography>Author:{book.author}</Typography>
            <Typography>Rating:rating</Typography>
            <Typography>Book ID:{book._id}</Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
  );
};
export default DueBookBook;
