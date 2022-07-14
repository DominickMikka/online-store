import { IProduct } from './interfaces/products';

class Products {

  products: IProduct[];
  allProducts: IProduct[];
  productsElement: HTMLElement;
  sortElement: HTMLElement;
  cartElement: HTMLElement;
  countProducts: number;

  constructor(products: IProduct[], productsElement: HTMLElement, sortElement: HTMLElement, cartElement: HTMLElement) {
    this.products = [...products];
    this.productsElement = productsElement as HTMLElement;
    this.sortElement = sortElement as HTMLElement;
    this.allProducts = [...products];
    this.cartElement = cartElement;
    this.countProducts = 0;
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
          Name: ${product.name}
        </div>
        <div class="product-year">
          Year: ${product.year}
        </div>
        <div class="product-platform">
          Platform: ${product.platform}
        </div>
        <div class="product-brand">
          Brand: ${product.brand}
        </div>
        <div class="product-popular">
          Popular: ${product.popular}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
    `;
    const button: HTMLElement = document.createElement('button');
    button.classList.add("product-add-to-cart");
    button.innerHTML = ` Add to cart `;
    button.addEventListener('click', () => {
      this.addToCart(product);
    });
    button.id = `product${product.id}`;
    component.appendChild(button);
  
    return component
  }

  addToCart(product: IProduct) {

    if (!product.inCart) {
      product.inCart = true;
    } else {
      product.inCart = false;
    }

    console.log(product);

    this.updateCountProducts(product.inCart);
  }

  renderCountProducts(): void {
    this.cartElement.innerHTML = `${this.countProducts}`;
  }

  updateCountProducts(status: boolean): number {

    if (status) {
      this.countProducts++
    } else {
      this.countProducts--
    }

    this.renderCountProducts();

    return this.countProducts
  }
}

export default Products