import React from 'react';
import './Header.css';
import Search from './Search';
import Cart from './Cart';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <a href="#">VGS</a>
      </div>
      <Search />
      <Cart />
    </header>
  );
}

export default Header;
