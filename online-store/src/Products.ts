import { IProduct } from './interfaces/products';

class Products {

  products: IProduct[];
  allProducts: IProduct[];
  productsElement: HTMLElement;
  cartElement: HTMLElement;
  productsInCart: number[];
  visibleProducts: IProduct[];
  productsForSearch: IProduct[];

  constructor(products: IProduct[], productsElement: HTMLElement, cartElement: HTMLElement) {
    this.products = [...products];

    this.products.forEach(product => {
      product.visible = true;
    });

    this.productsElement = productsElement as HTMLElement;
    this.allProducts = [...products];
    this.cartElement = cartElement;
    this.productsInCart = [];
    this.visibleProducts = [...products];
    this.productsForSearch = [];
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
  }

  findProduct(searchString: string) {
    if (searchString === '') {
      this.renderProducts(this.products);
    } else {

      this.visibleProducts.map((product) => {
        if (product.name.toLowerCase().includes(searchString.toLowerCase())) {
          product.visible = true;
        } else {
          product.visible = false;
        }
      });

      this.renderProducts(this.products);
    }
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

  filter(filter: string[][]) {
    if (filter[0].length === 0 && filter[1].length === 0 && filter[2].length === 0) {
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

      status.every((element) => { 
        if (element === true) return true
      }) ? product.visible = true : product.visible = false;
    });

    this.renderProducts(this.products);
  }

}

export default Products