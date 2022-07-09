import React from 'react';
import './Products.css';
import Product from './Product';
import Sort from './Sort';

const Products = () => {
  return (
    <div className='products'>
      <Sort />
      <Product />
    </div>
  );
}

export default Products;
