// orders.js
import { orders } from "../data/orders.js";
import { caluclatecartQuantity } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import formatcurrency from "./utils/money.js";
import { addtoCart  } from "../data/cart.js";

let items = []

orders.forEach((order) => {
  order.items.forEach((item) => {
    const matchingProduct = getProduct(item.productId);
    items.push(matchingProduct)
  })
})

// Helper function to format date
function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
displayOrders();
export function displayOrders() {
  let ordersContainer = document.querySelector('.js-orders-grid');
  
  let orderHTML = "";

  if (orders.length === 0) {
    orderHTML = `<div class="no-order-div"><p class="no-order">No Orders Yet</p>
    <a href="index.html">
        <button class="order-now-button button-primary">
          Order Now
        </button></a></div>`;
  }
  else {

    orders.forEach(order => {
      // Create the main container for each order
      orderHTML += `
        <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${formatDate(order.timestamp)}</div>  
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatcurrency(order.totalAmount)}</div>  
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.orderId}</div>
              </div>
            </div>
  
            <div class="order-details-grid">
              ${displayProducts(order)}
            </div>
          </div>
      `;
    });
  }

  ordersContainer.innerHTML = orderHTML;
}

let cartquantity = caluclatecartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cartquantity;

function displayProducts(order) {
  let html = "";
  order.items.forEach((item) => {
    const matchingProduct = getProduct(item.productId);

    // Create a tracking URL for each product
    const trackingURL = `tracking.html?orderId=${order.orderId}&productId=${item.productId}`;

    html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>
      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${item.deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${item.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
        
      </div>

      <div class="product-actions">
        <a href="${trackingURL}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>`;
  });
  return html;
}


document.querySelectorAll('.js-buy-again').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productId;

    addtoCart(productId, 1);
    updateCartQuantity();
  });
});

function updateCartQuantity(){
  let cartquantity=caluclatecartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML=cartquantity;
}
