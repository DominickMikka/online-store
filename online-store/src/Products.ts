import { IProduct } from './interfaces/products';

class Products {

  products: IProduct[];
  productsElement: HTMLElement;
  cartElement: HTMLElement;
  productsInCart: number[];
  visibleProducts: IProduct[];

  constructor(products: IProduct[], productsElement: HTMLElement, cartElement: HTMLElement) {
    this.products = [...products];
    this.products.forEach(product => { product.visible = true; });
    this.productsElement = productsElement as HTMLElement;
    this.cartElement = cartElement;

    const inCart = localStorage.getItem('productsInCart');

    if (inCart) {
      this.productsInCart = JSON.parse(inCart);
    } else {
      this.productsInCart = [];
    }
    
    this.visibleProducts = [...products];
  }

  renderProducts(products: IProduct[]) {
    let visibleProductsCount = 0;

    if (this.productsElement) {
      this.productsElement.innerHTML = ``;

      products.map((product) => {
        if (product.visible) {
          this.productsElement.appendChild(this.renderProduct(product));
          visibleProductsCount++;
        }
      });

      if (visibleProductsCount === 0) {
        this.productsElement.innerHTML = `Sorry, no products :(`;
      }
    }
  }

  private renderProduct(product: IProduct): HTMLElement {
    const component: HTMLElement = document.createElement('div');
    component.classList.add("product");
    
    component.innerHTML = `
        <div class="product-image">
          <img src="./assets/images/products/${product.image}" width="200" alt="" />
        </div>
        <div class="product-name">
          <span class="label">Name:</span> ${product.name}
        </div>
        <div class="product-year">
          <span class="label">Year:</span> ${product.year}
        </div>
        <div class="product-platform">
          <span class="label">Platform:</span> ${product.platform}
        </div>
        <div class="product-brand">
          <span class="label">Brand:</span> ${product.brand}
        </div>
        <div class="product-popular">
          <span class="label">Popular:</span> ${product.popular}
        </div>
        <div class="product-quantity">
          <span class="label">Quantity:</span> ${product.quantity}
        </div>
    `;
    const button: HTMLElement = document.createElement('button');
    button.classList.add("product-add-to-cart");
    button.innerHTML = ` Add to cart `;

    button.addEventListener('click', () => {
      this.addToCart(product);
      this.productsInCart.includes(product.id) ? component.classList.add("in-cart") : component.classList.remove("in-cart");
      localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
    });

    this.productsInCart.includes(product.id) ? component.classList.add("in-cart") : component.classList.remove("in-cart");

    button.id = `product${product.id}`;
    component.appendChild(button);
  
    return component
  }

  sortProducts(sort: string) {
    switch (sort) {
      case 'name_ask':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desk':
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'year_low_high':
        this.products.sort((a, b) => a.year - b.year);
        break;
      case 'year_high_low':
        this.products.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }
    this.renderProducts(this.products);

    localStorage.setItem('sort', sort);
  }

  addToCart(product: IProduct) {
    if (!this.productsInCart.includes(product.id)) {

      if (this.productsInCart.length === 20) {
        const bodyElement = <HTMLElement>document.querySelector('body');
        const errorCart: HTMLElement = document.createElement('div');
        errorCart.classList.add("errorCart");
        errorCart.innerHTML = `Sorry, but all the slots are full!`;
        bodyElement.prepend(errorCart);
        setTimeout(() => { errorCart.remove() }, 5000);
      } else {
        this.productsInCart.push(product.id);
      }
      
    } else {
      this.productsInCart.splice(this.productsInCart.indexOf(product.id), 1)
    }

    this.renderCountProducts();
  }

  renderCountProducts(): void {
    this.cartElement.innerHTML = `${this.productsInCart.length}`;
  }

  filter(filter: [string[], string[], string[], [number, number], [number, number], string]) {

    if (filter[0].length === 0 && filter[1].length === 0 && filter[2].length === 0 && filter[3][0] === null && filter[4][0] === null && filter[5] === '') {
      this.products.forEach(product => {
        product.visible = true;
      });
      this.renderProducts(this.products);

      return
    }

    this.products.map(product => {
      const status: boolean[] = [];

      if (filter[0].length !== 0) {
        filter[0].includes(product.platform) ? status[0] = true : status[0] = false;
      }

      if (filter[1].length !== 0) {
        filter[1].includes(product.brand) ? status[1] = true : status[1] = false;
      }

      if (filter[2].length !== 0) {
        filter[2].includes(product.popular) ? status[2] = true : status[2] = false;
      }

      product.year >= Math.round(filter[3][0]) && product.year <= Math.round(filter[3][1]) ? status[3] = true : status[3] = false;
      product.quantity >= Math.round(filter[4][0]) && product.quantity <= Math.round(filter[4][1]) ? status[4] = true : status[4] = false;
      product.name.toLowerCase().includes(filter[5].toLowerCase()) ? status[5] = true : status[5] = false;

      status.every((element) => { 
        if (element === true) return true
      }) ? product.visible = true : product.visible = false;
    });

    this.renderProducts(this.products);
  }

}

export default Products