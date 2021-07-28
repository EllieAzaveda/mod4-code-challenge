import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className='header'>
      <NavLink to='/' style={{ textDecoration: 'none' }}><h1 className='header-title'>NY Times Top Stories</h1></NavLink>
    </nav>
  )
}

export default Header;
