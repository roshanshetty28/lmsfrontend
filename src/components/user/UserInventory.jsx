import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from '../../features/user/userSlice'
import BooksUser from "./BooksUser";
import ReactPaginate from 'react-paginate';

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";

const genres = ["action", "drama", "sci - fi", "romance", "comedy"]
const UserInventory = () => {
  const limit = 5;
  const { userBooks, isLoading } = useSelector((state) => state.user)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [searchBy, setSearchBy] = useState('title');
  const [sort, setSort] = useState('asc');
  const [genre, setGenre] = useState('')
  const dispatch = useDispatch()
  const handleSearchBy = (event) => {
    setSearchBy(event.target.value);
  };
  const handleSortBy = (event) => {
    setSort(event.target.value);
  };
  const handlePageClick = (data) => {
    setPage(data.selected + 1)
  };
  const handleGenre = (event) => {
    setGenre(event.target.value)
  }
  useEffect(() => {
    let parameter = { page: page, search: search, searchBy: searchBy, sort: sort, genre: genre }
    const promise = dispatch(getAllBooks(parameter))
    return () => promise.abort()
  }, [search, sort, page, genre])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Box sx={{ m: 1 }}>
          <TextField
            fullWidth
            multiline
            type='search'
            id="user-inv-search"
            label="Search a Book"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </Box>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="user-inv-searchby-label" >Search By:</InputLabel>
            <Select sx={{ width: 150 }} label="Search By" labelId="demo-simple-select-label" id="user-inv-searchby" value={searchBy} onChange={handleSearchBy}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="user-inv-sort-label" >Sort:</InputLabel>
            <Select sx={{ width: 150 }} label="Sort:" labelId="demo-simple-select-label" id="user-inv-sort" value={sort} onChange={handleSortBy}>
              <MenuItem value="asc">A to Z</MenuItem>
              <MenuItem value="desc">Z to A</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="user-inv-genre-label" >Genre:</InputLabel>
            <Select sx={{ width: 150 }} label="Genre:" labelId="demo-simple-select-label" id="user-inv-genre" value={genre} onChange={handleGenre}>
              {genres.map((genre, index) => <MenuItem key={index} value={genre}>{genre[0].toUpperCase() + genre.slice(1)}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isLoading === true ? <Box sx={{ width: '100%', top: '50%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <CircularProgress thickness={1} size={200} /> </Box> : null}
      </Box>
      <Box>
        {userBooks.books.length > 0 ? <Box sx={{ p: 1, mt: 2, display: 'flex', flexWrap: 'wrap' }}> {userBooks.books.map((book, index) =>
          <BooksUser book={book} key={index} />
        )}</Box> :
          <Box style={{ display: 'flex', justifyContent: 'center', margin: '5%', padding: '5%'}}>
            <Typography>Sorry, No Books match your Search</Typography>
          </Box>}

        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'....'}
          pageCount={Math.ceil(userBooks.total / limit)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={6}
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
        />
      </Box>
    </>
  )
}

export default UserInventory