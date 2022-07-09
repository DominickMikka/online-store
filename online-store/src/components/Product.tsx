import React from 'react';

const Product = () => {
  return (
    <div className="product">
      <div className="product-image">
        <img src="./assets/images/products/{{ product.image }}" width="200" alt="" />
      </div>
      <div className="product-name">
        Name:
      </div>
      <div className="product-year">
        Year: 
      </div>
      <div className="product-platform">
        Platform: 
      </div>
      <div className="product-brand">
        Brand: 
      </div>
      <div className="product-popular">
        Popular: 
      </div>
      <div className="product-quantity">
        Quantity: 
      </div>
      <button className="product-add-to-cart">Add to cart</button>
    </div>
  );
}

export default Product;
