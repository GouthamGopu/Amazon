import{cart, removeFromCart,caluclatecartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatcurrency } from './utils/money.js';
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOption.js';

let cartSummary='';

cart.forEach((cartItem) => {
 const productId=cartItem.productId;

 let matchingProduct;

 products.forEach((product) =>{
  if(productId === product.id){
    matchingProduct=product;
  }
 });

 let deliveryOptionId = cartItem.deliveryOptionId;
 let deliveryOption;
 deliveryOptions.forEach((option)=>{
  if(option.id===deliveryOptionId)
    deliveryOption=option;
 });
  const today = dayjs();
  const deliverydate= today.add(
    deliveryOption.deliverydays,
    'days'
  );
  const dateString = deliverydate.format('dddd, MMMM D');

 cartSummary+=`<div class="cart-item-container js-cart-item-container-${productId}">
 <div class="delivery-date">
   Delivery date: ${dateString}
 </div>

 <div class="cart-item-details-grid">
   <img class="product-image"
     src="${matchingProduct.image}">

   <div class="cart-item-details">
     <div class="product-name">
       ${matchingProduct.name}
     </div>
     <div class="product-price">
       $${formatcurrency(matchingProduct.priceCents)}
     </div>
     <div class="product-quantity  js-product-quantity-${matchingProduct.id}" >
       <span>
         Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}}">
         Update
       </span>
       <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="1">
       <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
       <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>
     ${deliveryOptionsHTML(matchingProduct,cartItem)}
    </div>
 </div>
</div>`;
checkoutUpdate();
});
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliverydate= today.add(
      deliveryOption.deliverydays,
      'days'
    );


    const priceString = deliveryOption.priceCents===0
    ?'FREE'
    :`$${formatcurrency(deliveryOption.priceCents)} -`;
    const dateString = deliverydate.format('dddd, MMMM D');

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html +=`
    <div class="delivery-option">
      <input type="radio"
        ${isChecked? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
        ${priceString} Shipping
        </div>
      </div>
    </div>
  `
  });
  return html;
}
document.querySelector('.js-order-summary').innerHTML= cartSummary||'<p>your cart is empty</p>';

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);
   document.querySelector(`.js-cart-item-container-${productId}`).remove();
   checkoutUpdate();
  });
});

function checkoutUpdate(){
  let cartquantity=caluclatecartQuantity();
  document.querySelector('.js-cart-quantity-header').innerHTML=`${cartquantity} items`;
}


document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container1 =document.querySelector(`.js-cart-item-container-${productId}`);
      container1.classList.add('is-editing-quantity');
    });
  });
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
  const quantityInput = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 0 || newQuantity >= 1000) {
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }
  updateQuantity(productId, newQuantity);

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove('is-editing-quantity');

  const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`
  );})});