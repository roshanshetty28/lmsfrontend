import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks } from '../../features/admin/adminSlice'
import ReactPaginate from 'react-paginate';

import Box from '@mui/material/Box';
import InventoryCard from './InventoryCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const Inventory = () => {
  const limit = 5
  const { inventory, isLoading } = useSelector((state) => state.admin)
  const [sortBy, setSortBy] = useState('asc');
  const [search, setSearch] = useState('')
  const [curPage, setcurPage] = useState(1)
  const dispatch = useDispatch()
  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const handlePageClick = (data) => {
    setcurPage(data.selected + 1);
  }
  useEffect(() => {
    const data = {
      search: search, sort: sortBy, page: curPage
    }
    const promise = dispatch(getAllBooks(data))
    return () => promise.abort()
  }, [search, sortBy, curPage])

  return (
    <>
      <Box>
        <Box sx={{ m: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <SearchIcon />
            <TextField margin='none'
              id="inv-title" type='search' placeholder='Search a Book by Title' value={search} onChange={(e) => setSearch(e.target.value)} />
          </Box>
          <Box sx={{ m: 1, minWidth: 80 }}>
            <FormControl>
              <InputLabel id="inv-sortBy" >Sort By:</InputLabel>
              <Select sx={{ width: 150 }} label="Search By" labelId="demo-simple-select-label" id="inv-sortby-values" value={sortBy} onChange={handleSortBy}>
                <MenuItem value="asc">A to Z</MenuItem>
                <MenuItem value="desc">Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress thickness={1} size={200} /></Box> :
            <>
              {inventory.books.length !== 0 ? inventory.books.map((book, index) => <InventoryCard book={book} key={index} />
              ) : <Typography variant='h6' sx={{ width: '100%', textAlign: 'center' }}>No Books</Typography>}
            </>
          }
        </Box>
        {inventory.books.length !== 0 ? <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'....'}
          pageCount={Math.ceil(inventory.total / limit)}
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
  );
};
export default Inventory;
