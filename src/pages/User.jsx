import React, { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const User = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  useEffect(() => {
    const check = localStorage.getItem('user');
    const j = JSON.parse(check)
    if (!user&&!check) {
      navigate('/login');
    }
    if (j.admin === true) {
      navigate('/')
    }
  },[user,navigate]);
  return (
    <div>
      <Navbar/>
    <nav className="usertab">
      <NavLink to='/users/userissued'>Issued Books</NavLink>
      <NavLink to='/users/userrequested'>Requested Books</NavLink>
      <NavLink to='/users/userinventory'>Inventory</NavLink>
      <NavLink to='/users/wishlist'>WishList</NavLink>
    </nav>
    <Outlet/>
    </div>
  );
};
export default User;
