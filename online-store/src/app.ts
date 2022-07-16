import { allProducts } from './data/data';
import './style.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import wNumb from 'wnumb';

import Products from './Products';

const productsElement = <HTMLElement>document.querySelector('.products');
const sortElement = <HTMLSelectElement>document.querySelector('.sort');
const search = <HTMLElement>document.querySelector('.search__input');
const cartElement = <HTMLElement>document.querySelector('.cartValue');
const platformFilters = document.querySelectorAll<HTMLElement>('.platform-filters input[type=checkbox]');

const sliderYearproductsElement = <HTMLElement>document.querySelector('.sliderYear');
const sliderQuantityproductsElement = <HTMLElement>document.querySelector('.sliderQuantity');

noUiSlider.create(sliderYearproductsElement, {
  range: {
      'min': 2020,
      'max': 2022
  },
  snap: false,
  start: [2020, 2022],
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

noUiSlider.create(sliderQuantityproductsElement, {
  range: {
      'min': 10,
      'max': 25
  },
  snap: false,
  start: [10, 25],
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

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



platformFilters.forEach(e => {
  e.addEventListener('change', () => {
    const filters: string[] = [];
    platformFilters.forEach(element => {
      if ((element as HTMLInputElement).checked) {
        filters.push((element as HTMLInputElement).value);
      }
    });
    currentProducts = products.filterProductByPlatform(currentProducts, filters);
    currentProducts = products.renderProducts(currentProducts);
    });
});