import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIssuedBooks } from '../../features/user/userSlice'
import ClipLoader from "react-spinners/ClipLoader";
import BooksUser from './BooksUser';

const UserIssuedBooks = () => {
  const { userIssued, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const override = {
    display: "block",
    margin: "40%",
    borderColor: "white",
  };
  useEffect(() => {
    if (userIssued.length === 0) {
      dispatch(getIssuedBooks())
    }
  }, []);

  return (
    <>
      {isLoading === true ? <ClipLoader size={150} cssOverride={override} loading={true} /> : null}
        {userIssued.length===0 ? 'You have Not Issued any Books' : userIssued.map((book, index) =>
          <BooksUser book={book} key={index} />
        )}
    </>
  )
}

export default UserIssuedBooks