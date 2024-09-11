import{cart, removeFromCart,caluclatecartQuantity,updateDeliveryOption,savetoCart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getdeliveryOption} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderorderSummary(){

let cartSummary='';

cart.forEach((cartItem) => {
 const productId=cartItem.productId;

 const matchingProduct = getProduct(productId);

 let deliveryOptionId = cartItem.deliveryOptionId;

 const deliveryOption = getdeliveryOption(deliveryOptionId);


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
       <span class="update-quantity-link link-primary js-update-link js-update-link-${productId}" data-product-id="${productId}">
         Update
       </span>
       <input class="quantity-input js-quantity-input-${productId} none" type="number" value="1" min="1">
       <span class="save-quantity-link link-primary js-save-link js-save-link-${productId} none" data-product-id="${productId}">
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
    <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
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
const emptyCartMessage = `
<div class="no-order-div">
  <p>Your cart is empty</p>
  <a href="index.html">
    <button class="order-now-button button-primary">
      Order Now
    </button>
  </a>
</div>
`;

// Set the innerHTML based on whether cartSummary is available or not
document.querySelector('.js-order-summary').innerHTML= cartSummary || emptyCartMessage;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);
   checkoutUpdate();
   renderorderSummary();
   renderPaymentSummary();
  });
});

function checkoutUpdate(){
  let cartquantity=caluclatecartQuantity();
  document.querySelector('.js-cart-quantity-header').innerHTML=`${cartquantity} items`;
}

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderorderSummary();
      renderPaymentSummary();
    });
  });

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    link.classList.add("none");
    document.querySelector(`.js-quantity-input-${productId}`).classList.remove("none");
    document.querySelector(`.js-save-link-${productId}`).classList.remove("none");
  });
});

document.querySelectorAll('.js-save-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    link.classList.add("none");
    document.querySelector(`.js-quantity-input-${productId}`).classList.add("none");
    document.querySelector(`.js-update-link-${productId}`).classList.remove("none");
    savetoCart(productId);
    checkoutUpdate();
    renderorderSummary();
    renderPaymentSummary();
  });
});
}
