import { IProduct } from './interfaces/products';

class Products {

  products: IProduct[];
  allProducts: IProduct[];
  productsElement: HTMLElement;
  sortElement: HTMLElement;
  cartElement: HTMLElement;
  countProducts: number;
  productsInCart: number[];

  constructor(products: IProduct[], productsElement: HTMLElement, sortElement: HTMLElement, cartElement: HTMLElement) {
    this.products = [...products];
    this.productsElement = productsElement as HTMLElement;
    this.sortElement = sortElement as HTMLElement;
    this.allProducts = [...products];
    this.cartElement = cartElement;
    this.countProducts = 0;
    this.productsInCart = [];
  }

  getProducts(): IProduct[] {
    return this.products
  }

  renderProducts(products: IProduct[]): IProduct[] {
    if (this.productsElement) {
      this.productsElement.innerHTML = ``;
      products.map((product) => {
        this.productsElement.appendChild(this.renderProduct(product));
      });
    }

    this.products = [...products];

    return this.products
  }

  sortProducts(products: IProduct[], sort: string): IProduct[] {
    const prod = [...products];
    switch (sort) {
      case 'name_ask':
        prod.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desk':
        prod.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'year_low_high':
        prod.sort((a, b) => a.year - b.year);
        break;
      case 'year_high_low':
        prod.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
      } 

      this.products = [...prod];

    return this.products
  }

  findProduct(products: IProduct[], event: Event): IProduct[] {
    const filter: string = (event.target as HTMLInputElement).value;
    const prod: IProduct[] = [];

    if (filter === '') {
      return this.allProducts
    }

    products.map((p) => {
      if (filter) {
        if ((p.name).toLowerCase().includes(filter.toLowerCase())) {
          prod.push(p);
        }
      }
    });

    this.products = [...prod];

    return this.products
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

        if (this.productsInCart.includes(product.id)) {
          component.classList.add("in-cart");
        } else {
          component.classList.remove("in-cart");
        }

      });

        if (this.productsInCart.includes(product.id)) {
          component.classList.add("in-cart");
        } else {
          component.classList.remove("in-cart");
        }

      console.log(this.productsInCart);
      console.log(product.id);

    button.id = `product${product.id}`;
    component.appendChild(button);
  
    return component
  }

  addToCart(product: IProduct) {
    if (!this.productsInCart.includes(product.id)) {

      if (this.productsInCart.length === 20) {
        window.alert('Too much product added in the cart:(');
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

  filterProductByPlatform(products: IProduct[], filter: string[]) {
    const prod: IProduct[] = [];

    if (filter.length === 0) {
      return this.allProducts
    }

    if (products.length === 0) {
      products = this.allProducts;
    }

    products.forEach(e => {
      if (filter.includes(e.platform)) {
        prod.push(e);
      }
    });

    this.products = [...prod];

    return this.products
  }

}

export default Products