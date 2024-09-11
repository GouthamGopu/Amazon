import{addtoCart,caluclatecartQuantity} from'../data/cart.js';
import{products} from'../data/products.js';
import { formatcurrency } from './utils/money.js';

let html='';
products.forEach((product)=>{
  html+=`<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars*10}.png">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    $${formatcurrency(product.priceCents)}
  </div>

  <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart js-added-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart"
   data-product-id="${product.id}">
    Add to Cart
  </button>
</div>`;
updateCartQuantity();
});
document.querySelector('.products-grid').innerHTML=html;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productId;
    let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    addtoCart(productId,quantity);
    updateCartQuantity();
    addPromptMessage(productId);
  });
});


export function updateCartQuantity(){
  let cartquantity=caluclatecartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML=cartquantity;
}


function addPromptMessage(productId){
  document.querySelectorAll(`.js-added-to-cart-${productId}`).forEach((div)=>{
    div.classList.add('added-to-carts');
    setTimeout(()=>{div.classList.remove('added-to-carts');},2000);
  });
}
