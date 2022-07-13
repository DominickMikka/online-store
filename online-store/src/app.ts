import { allProducts } from './data/data';
import './style.css';

import Products from './Products';

const productsElement = <HTMLElement>document.querySelector('.products');
const sortElement = <HTMLElement>document.querySelector('.sort');
const search = <HTMLElement>document.querySelector('.search__input');

const products = new Products(allProducts, productsElement, sortElement);

let currentProducts = products.renderProducts(allProducts);

sortElement.addEventListener('change', (e) => {
  currentProducts = products.sortProducts(currentProducts, e);
  currentProducts = products.renderProducts(currentProducts);
  console.log(currentProducts);
});

search.addEventListener('input', (e) => {
  currentProducts = products.findProduct(currentProducts, e);
  currentProducts = products.renderProducts(currentProducts);
  console.log(currentProducts);
});