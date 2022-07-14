import { allProducts } from './data/data';
import './style.css';

import Products from './Products';

const productsElement = <HTMLElement>document.querySelector('.products');
const sortElement = <HTMLSelectElement>document.querySelector('.sort');
const search = <HTMLElement>document.querySelector('.search__input');
const cartElement = <HTMLElement>document.querySelector('.cartValue');


const products = new Products(allProducts, productsElement, sortElement, cartElement);

products.renderCountProducts();

let currentProducts = products.renderProducts(allProducts);

sortElement.addEventListener('change', (e) => {
  currentProducts = products.sortProducts(currentProducts, (e.target as HTMLSelectElement).value);
  currentProducts = products.renderProducts(currentProducts);
  console.log(currentProducts);
});

search.addEventListener('input', (e) => {
  currentProducts = products.findProduct(currentProducts, e);
  currentProducts = products.sortProducts(currentProducts, sortElement.options[sortElement.selectedIndex].value);
  currentProducts = products.renderProducts(currentProducts);
  console.log(currentProducts);
});