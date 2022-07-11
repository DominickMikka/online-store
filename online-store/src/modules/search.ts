import { getProducts } from './products';

const search = document.querySelector('.search__input');

if (search) {
  search.addEventListener('input', (e) => {
    getProducts((e.target as HTMLInputElement).value);
  });
}

