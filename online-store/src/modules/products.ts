import { allProducts } from '../data/data';
import product from './product';

export const getProducts = (filter?: string): void => {
  const products = document.querySelector('.products');

  if (products) {
    products.innerHTML = ``;
  }

  allProducts.map((prod) => {

    if (filter) {

      if ((prod.name).toLowerCase().includes(filter.toLowerCase())) {
        if (products) {
          products.appendChild(product(prod));
        }
      }
      
    } else {

      if (products) {
        products.appendChild(product(prod));
      }

    }
  })
}