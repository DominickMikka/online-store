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
const clearSearchElement = <HTMLElement>document.querySelector('.clear-search');

search.focus();

const yearFilter = noUiSlider.create(sliderYearproductsElement, {
  range: {'min': 2014, 'max': 2022},
  snap: false,
  start: [2014, 2022],
  connect: true,
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

const quantityFilter = noUiSlider.create(sliderQuantityproductsElement, {
  range: {'min': 3, 'max': 25},
  snap: false,
  start: [3, 25],
  connect: true,
  tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
});

const products = new Products(allProducts, productsElement, cartElement);

const sortValue = localStorage.getItem('sort');

if (sortValue) {
  products.sortProducts(sortValue);
  sortElement.value = sortValue;
}

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

  const year: number[] = [];
  const quantity: number[] = [];

  if (filtersYear instanceof Array && typeof filtersYear[0] === 'number' && typeof filtersYear[1] === 'number') {
    year[0] = filtersYear[0];
    year[1] = filtersYear[1];
  }

  if (filtersQuantity instanceof Array && typeof filtersQuantity[0] === 'number' && typeof filtersQuantity[1] === 'number') {
    quantity[0] = filtersQuantity[0];
    quantity[1] = filtersQuantity[1];
  }

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

clearSearchElement.addEventListener('click', () => {
  search.value = '';
  const filters = getFilters();
  products.filter(filters);
  search.focus();
});

console.log(`
САМООЦЕНКА: 180/200

Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10

Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине +10

Добавление товаров в корзину +20
- кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных +10
- на странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" +10

Сортировка +20
 - сортировка товаров по названию в возрастающем и убывающем порядке +10
 - сортировка товаров по году их выхода на рынок в возрастающем и убывающем порядке +10

Фильтры в указанном диапазоне от и до +30
 - фильтры по количеству +10
 - фильтры по году выпуска на рынок +10
 - для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10

Фильтры по значению +30
 - свои фильтры по платформе, бренду, популярности

Можно отфильтровать товары по нескольким фильтрам разного типа +20

Сброс фильтров +20
 - есть кнопка reset для сброса фильтров +10
 - при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10

Сохранение настроек в local storage +10
	- сохраняется только сортировка и товары в корзине

Поиск +30
 - при открытии приложения курсор находится в поле поиска +2
 - автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
 - есть placeholder +2
 - в поле поиска есть крестик, позволяющий очистить поле поиска +2
 - если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" +2
 - при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10
 - если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки +10
`);