import React from 'react';
import { Product as IProduct} from '../interfaces/products';

const Product = (props: IProduct) => {

  return (
    <div className="product">
      <div className="product-image">
        <img src={require(`../assets/images/products/${props.image}`)} width="200" alt="" />
      </div>
      <div className="product-name">
        Name: {props.name}
      </div>
      <div className="product-year">
        Year: {props.year}
      </div>
      <div className="product-platform">
        Platform: {props.platform}
      </div>
      <div className="product-brand">
        Brand: {props.brand}
      </div>
      <div className="product-popular">
        Popular: {props.popular}
      </div>
      <div className="product-quantity">
        Quantity: {props.quantity}
      </div>
      <button className="product-add-to-cart">Add to cart</button>
    </div>
  );
}

export default Product;
