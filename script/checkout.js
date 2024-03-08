import{cart, removeFromCart,caluclatecartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatcurrency } from './utils/money.js';

let cartSummary='';

cart.forEach((cartItem) => {
 const productId=cartItem.productId;

 let matchingProduct;

 products.forEach((product) =>{
  if(productId === product.id){
    matchingProduct=product;
  }
 });

 cartSummary+=`<div class="cart-item-container js-cart-item-container-${productId}">
 <div class="delivery-date">
   Delivery date: Tuesday, June 21
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
     <div class="product-quantity js-product-quantity" >
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
     <div class="delivery-option">
       <input type="radio" checked
         class="delivery-option-input"
         name="delivery-option-${productId}">
       <div>
         <div class="delivery-option-date">
           Tuesday, June 21
         </div>
         <div class="delivery-option-price">
           FREE Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${productId}">
       <div>
         <div class="delivery-option-date">
           Wednesday, June 15
         </div>
         <div class="delivery-option-price">
           $4.99 - Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${productId}">
       <div>
         <div class="delivery-option-date">
           Monday, June 13
         </div>
         <div class="delivery-option-price">
           $9.99 - Shipping
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`;
checkoutUpdate();
});
document.querySelector('.js-order-summary').innerHTML= cartSummary||'<p>your cart is empty</p>';

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(document.querySelector(`.js-cart-item-container-${productId}`));
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
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
  const quantityInput = document.querySelector(
    `.js-quantity-input-${productId}`
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