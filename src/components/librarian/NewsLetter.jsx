import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newsLetter } from '../../features/admin/adminSlice'
import { useFormik } from 'formik'
import { newsLetterSchema } from '../../schema/AdminSchema'

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography'

const initialValues = {
  audience: "",
  subject: "",
  body: ""
}

const NewsLetter = () => {
  const dispatch = useDispatch()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: newsLetterSchema,
    onSubmit: (values) => {
      dispatch(newsLetter(values))
    }
  })
  const { isLoading } = useSelector((state) => state.admin)

  return (
    <>
      <Card sx={{ minHeight: '77vh', backgroundColor: '#c4d3f5' }}>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="newsletter-send-to" sx={{ color: errors.audience && touched.audience ? 'red' : '#615b5b' }} >Send To:</InputLabel>
            <Select sx={{ width: 150 }} label="Send To" name="audience" labelId="demo-simple-select-label" id="newsletter-audience" value={values.audience} onChange={handleChange} onBlur={handleBlur}
              error={errors.audience && touched.audience}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="subscribers">Subscribers</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ fontSize: 12, pl: 2, color: 'red' }}>{errors.audience && touched.audience ? errors.audience : null}</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            required
            multiline
            fullWidth
            id="newsletter-subject"
            label="Subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.subject && touched.subject ? errors.subject : null}
            error={errors.subject && touched.subject}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextareaAutosize
            id='newsletter-body'
            aria-label="minimum height"
            minRows={10}
            placeholder="Body"
            style={{ width: '100%', fontSize: 17, borderRadius: 0.1, backgroundColor: 'inherit', borderColor: errors.body && touched.body ? 'red' : '#bfbdb8', borderRadius: '4px' }}
            name="body"
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Typography sx={{ fontSize: 12, pl: 2, color: 'red' }}>{errors.audience && touched.audience ? errors.audience : null}</Typography>
        </Box>
        <CardActions sx={{}}>
          <Button disabled={isLoading === true ? true : false} fullWidth onClick={handleSubmit} variant="contained">{isLoading === false ? 'Send News' : 'Sending...'}</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default NewsLetter