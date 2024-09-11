import { getProduct } from "./products.js";
import { getdeliveryOption } from "./deliveryOption.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let orders = [];

loadOrdersFromStorage();

export function loadOrdersFromStorage() {
  orders = JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrdersToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function placeOrder(cart) {
  const orderId = generateUUID();  // Unique ID for the order

  // Calculate the total amount of the cart items
  const totalAmount = calculateTotalAmount(cart);

  // Add delivery dates to each cart item
  const updatedCart = cart.map(item => {
    const deliveryOption = getdeliveryOption(item.deliveryOptionId);
    const deliveryDate = dayjs().add(deliveryOption.deliverydays, 'days').format('dddd, MMMM D');
    return {
      ...item,
      deliveryDate
    };
  });

  const newOrder = {
    orderId,
    items: updatedCart, // Include delivery dates in the items
    timestamp: new Date().toISOString(), // Store the current timestamp
    totalAmount // Include the total amount for the new order
  };

  orders.push(newOrder);  // Add the new order to the array
  saveOrdersToStorage();  // Save updated orders to local storage
}

// Helper function to calculate total amount from order items
function calculateTotalAmount(items) {
  return items.reduce((total, item) => {
    const product = getProduct(item.productId);  // Fetch the product details
    return total + (product.priceCents * item.quantity);
  }, 0);
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getOrder(orderId) {
  return orders.find((order) => order.orderId === orderId);
}