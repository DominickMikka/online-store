import React from 'react';
import './Main.css';
import Products from './Products';
import Sidebar from './Sidebar';

const Main = () => {
  return (
    <main>
      <Sidebar />
      <Products />
    </main>
  );
}

export default Main;
