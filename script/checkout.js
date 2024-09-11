import { renderorderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { cart,clearCart } from '../../data/cart.js';
import { placeOrder } from '../../data/orders.js';
renderorderSummary();
renderPaymentSummary();

let orderBtn = document.querySelector(".js-place-order-btn");

if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      placeOrder(cart); // Move all cart items to orders
      clearCart();      // Clear the cart after placing the order
      alert('Order placed successfully!');
      window.location = "/orders.html"; 
      // Redirect to the orders page
    } else {
      alert('Cart is empty.');
    }
    renderorderSummary();
    renderPaymentSummary();
  });
}