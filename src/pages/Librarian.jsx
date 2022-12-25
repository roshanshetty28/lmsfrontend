import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Librarian = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const check = localStorage.getItem('user');
    const j = JSON.parse(check)
    if (!user && !check) {
      navigate('/login');
    }
    if (j.admin === false) {
      navigate('/users')
    }
  }, [user, navigate]);
  return (
    <>
    <div className='librarian'>
      <Navbar />
      <nav className="librariantab">
        <NavLink to="/issue">Issue</NavLink>
        <NavLink to="/issued">Return</NavLink>
        <NavLink to="/requested">Requested</NavLink>
        <NavLink to="/duebooks">Due Books</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/user">Delete User</NavLink>
        <NavLink to="/addbook">Add Book</NavLink>
        <NavLink to="/subscribers">Subscribers</NavLink>
        <NavLink to="/news">News Letter</NavLink>
        <NavLink to="/logs">Activity Logs</NavLink>
      </nav>
      <Outlet />
    </div>
    </>
  );
};
export default Librarian;
