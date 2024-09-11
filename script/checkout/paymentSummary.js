import { cart,clearCart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getdeliveryOption } from '../../data/deliveryOption.js';
import { formatcurrency } from '../utils/money.js';
import { caluclatecartQuantity } from '../../data/cart.js';
import { placeOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; // Assuming 10% tax
  const totalCents = totalBeforeTaxCents + taxCents;

  let cartquantity = caluclatecartQuantity();

  // Construct the payment summary HTML
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartquantity}):</div>
      <div class="payment-summary-money">$${formatcurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatcurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatcurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatcurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatcurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-btn">
      Place your order
    </button>
  `;

  // Render the payment summary HTML in the DOM
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  let orderBtn = document.querySelector(".js-place-order-btn");

  orderBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      placeOrder(cart); // Move all cart items to orders
      clearCart();      // Clear the cart after placing the order
      alert('Order placed successfully!');
      window.location = "/orders.html";
    } else {
      alert('Cart is empty.');
    }
    renderorderSummary();
    renderPaymentSummary();
  });


}
