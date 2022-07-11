import { IProduct } from '../interfaces/products';

const product = (prod: IProduct): HTMLElement => {
  const component: HTMLElement = document.createElement('div');
  component.classList.add("product");
  component.id = `product${prod.id}`;
  component.innerHTML = `
      <div class="product-image">
        <img src="./assets/images/products/${prod.image}" width="200" alt="" />
      </div>
      <div class="product-name">
        Name: ${prod.name}
      </div>
      <div class="product-year">
        Year: ${prod.year}
      </div>
      <div class="product-platform">
        Platform: ${prod.platform}
      </div>
      <div class="product-brand">
        Brand: ${prod.brand}
      </div>
      <div class="product-popular">
        Popular: ${prod.popular}
      </div>
      <div class="product-quantity">
        Quantity: ${prod.quantity}
      </div>
      <button class="product-add-to-cart">
        Add to cart
      </button>
  `;

  return component
}

export default product;
