import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks } from '../../features/admin/adminSlice'
import ClipLoader from "react-spinners/ClipLoader";

import Box from '@mui/material/Box';
import InventoryCard from './InventoryCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';

const Inventory = () => {
  const { inventory,page, isLoading } = useSelector((state) => state.admin)
  const [sortBy, setSortBy] = useState('asc');
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };
  useEffect(() => {
    let mounted = true
    if (mounted) {
      const data={
        search:search,sort:sortBy,page:page
      }
      dispatch(getAllBooks(data))
    }
    return () => mounted = false
  }, [search,sortBy])

  return (
    <>{isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
      <Box>
        <Box sx={{ m: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <SearchIcon />
            <TextField margin='none'
              id="outlined" type='search' placeholder='Search a Book by Title' value={search} onChange={(e) => setSearch(e.target.value)} />
          </Box>
          <Box sx={{ m: 1, minWidth: 80 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label" >Sort By:</InputLabel>
              <Select sx={{ width: 150 }} label="Search By" labelId="demo-simple-select-label" id="demo-simple-select" value={sortBy} onChange={handleSortBy}>
                <MenuItem value="asc">A to Z</MenuItem>
                <MenuItem value="desc">Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {inventory.map((book, index) => <InventoryCard book={book} key={index} />
          )}
        </Box>
      </Box>
    </>
  );
};
export default Inventory;
