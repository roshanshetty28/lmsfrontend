import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BooksUser from "./BooksUser";
import { getAllBooks } from '../../features/user/userSlice'
import ReactPaginate from 'react-paginate';
import ClipLoader from "react-spinners/ClipLoader";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";

const UserInventory = () => {
  const { userBooks, pages, isLoading } = useSelector((state) => state.user)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [searchBy, setSearchBy] = useState('title');
  const [sort, setSort] = useState('asc');
  const dispatch = useDispatch()
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  const handleSearchBy = (event) => {
    setSearchBy(event.target.value);
  };
  const handleSortBy = (event) => {
    setSort(event.target.value);
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    setPage(currentPage)
  };
  useEffect(() => {
    let parameter = { page: page, search: search, searchBy: searchBy, sort: sort }
    dispatch(getAllBooks(parameter))
  }, [search, searchBy, sort, page])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Box sx={{ m: 1 }}>
          <TextField
            type='search'
            id="outlined-required"
            label="Search a Book"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </Box>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label" >Search By:</InputLabel>
            <Select sx={{ width: 150 }} label="Search By" labelId="demo-simple-select-label" id="demo-simple-select" value={searchBy} onChange={handleSearchBy}>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label" >Sort:</InputLabel>
            <Select sx={{ width: 150 }} label="Sort:" labelId="demo-simple-select-label" id="demo-simple-select" value={sort} onChange={handleSortBy}>
              <MenuItem value="asc">A to Z</MenuItem>
              <MenuItem value="desc">Z to A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
      <div className="showBooksUser">
        <Box sx={{ p: 1, mt: 2, display: 'flex', flexWrap: 'wrap' }}>
          {userBooks.length > 0 ? userBooks.map((book, index) =>
            <BooksUser book={book} key={index} />
          ) : <div style={{ margin: '5%', padding: '5%', border: '1px solid black', textAlign: 'center' }}>Sorry, No Books match your Search</div>}
        </Box>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'....'}
          pageCount={Math.ceil(pages)}
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
          activeClassName={'active'}
        />
      </div>
    </>
  )
}

export default UserInventory