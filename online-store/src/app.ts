import { allProducts } from './data/data';
import './style.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';
import Products from './Products';

const productsElement = <HTMLElement>document.querySelector('.products');
const sortElement = <HTMLSelectElement>document.querySelector('.sort');
const search = <HTMLInputElement>document.querySelector('.search__input');
const cartElement = <HTMLElement>document.querySelector('.cartValue');
const filtersPlatformElement = document.querySelectorAll<HTMLElement>('.platform-filters input[type=checkbox]');
const filtersBrandElement = document.querySelectorAll<HTMLElement>('.brand-filters input[type=checkbox]');
const filtersPopularElement = document.querySelectorAll<HTMLElement>('.popular-filters input[type=checkbox]');
const clearFilersElement = <HTMLElement>document.querySelector('.reset-filters');
const sliderYearproductsElement = <HTMLElement>document.querySelector('.sliderYear');
const sliderQuantityproductsElement = <HTMLElement>document.querySelector('.sliderQuantity');

search.focus();

const yearFilter = noUiSlider.create(sliderYearproductsElement, {
  range: {'min': 2014, 'max': 2022},
  snap: false,
  start: [2014, 2022],
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

const quantityFilter = noUiSlider.create(sliderQuantityproductsElement, {
  range: {'min': 3, 'max': 25},
  snap: false,
  start: [3, 25],
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

const products = new Products(allProducts, productsElement, cartElement);

products.renderCountProducts();
products.renderProducts(allProducts);

sortElement.addEventListener('change', (e) => {
  products.sortProducts((e.target as HTMLSelectElement).value);
});

filtersPlatformElement.forEach(e => {
  e.addEventListener('change', () => {
    const filters = getFilters();
    products.filter(filters);
  });
});

filtersBrandElement.forEach(e => {
  e.addEventListener('change', () => {
    const filters = getFilters();
    products.filter(filters);
  });
});

filtersPopularElement.forEach(e => {
  e.addEventListener('change', () => {
    const filters = getFilters();
    products.filter(filters);
  });
});

const getFilters = () => {
  const filterSearch = search.value;
  const filtersPlatform: string[] = [];
  const filtersBrand: string[] = [];
  const filtersPopular: string[] = [];
  const filtersYear = yearFilter.get(true);
  const filtersQuantity = quantityFilter.get(true);

  let year = [];
  year.push(filtersYear);
  year = year.flat();

  let quantity = [];
  quantity.push(filtersQuantity);
  quantity = quantity.flat();

  filtersPlatformElement.forEach(element => {
    if ((element as HTMLInputElement).checked) 
      filtersPlatform.push((element as HTMLInputElement).value);
  });

  filtersBrandElement.forEach(element => {
    if ((element as HTMLInputElement).checked) 
      filtersBrand.push((element as HTMLInputElement).value);
  });

  filtersPopularElement.forEach(element => {
    if ((element as HTMLInputElement).checked) 
      filtersPopular.push((element as HTMLInputElement).value);
  });

  return [ filtersPlatform, filtersBrand, filtersPopular, [year[0], year[1]], [quantity[0], quantity[1]], filterSearch ] as [string[], string[], string[], [number, number], [number, number], string]
}

yearFilter.on('update', () => {
  const filters = getFilters();
  products.filter(filters);
});

quantityFilter.on('update', () => {
  const filters = getFilters();
  products.filter(filters);
});

search.addEventListener('input', () => {
  const filters = getFilters();
  products.filter(filters);
});

clearFilersElement.addEventListener('click', () => {
  filtersPlatformElement.forEach(element => (element as HTMLInputElement).checked = false);
  filtersBrandElement.forEach(element => (element as HTMLInputElement).checked = false);
  filtersPopularElement.forEach(element => (element as HTMLInputElement).checked = false);
  yearFilter.set([2014, 2022]);
  quantityFilter.set([3, 25]);
  products.filter([[], [], [], [2014, 2022], [3, 25], search.value]);
});