import React, { useState } from 'react';
import './Products.css';
import Product from './Product';
import Sort from './Sort';
import { allProducts } from '../data/products'

const Products = () => {

  const [prod] = useState(allProducts);

  return (
    <div className='products'>
      <Sort />
      <>
        {prod.map((prod) => 
        <Product id={prod.id} quantity={prod.quantity} brand={prod.brand} platform={prod.platform} name={prod.name} year={prod.year} popular={prod.popular} image={prod.image} key={prod.id} />
        )}
      </>
    </div>
  );
}

export default Products;
