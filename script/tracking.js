import { getOrder } from "../data/orders.js";
import { getProduct } from "../data/products.js";

// Function to get query parameters from the URL
function getQueryParams() {
  const queryParams = {};
  window.location.search.substring(1).split("&").forEach(function(pair) {
    const [key, value] = pair.split("=");
    queryParams[key] = decodeURIComponent(value);
  });
  return queryParams;
}

// Function to calculate the progress percentage
function calculateProgress(orderTimestamp, deliveryDate) {
  const now = new Date();
  const orderTime = new Date(orderTimestamp).getTime(); // Using orderTimestamp
  const deliveryTime = new Date(deliveryDate).getTime();
  
  // Total time between order and delivery
  const totalTime = deliveryTime - orderTime;

  // Elapsed time from order to current date
  const elapsedTime = now.getTime() - orderTime;

  // Calculate the percentage of time passed
  let progress = (elapsedTime / totalTime) * 100;

  // Ensure a minimum progress of 5% if progress is very small
  const minimumProgress = 5;

  // Adjust progress to be between the minimumProgress and 100
  progress = Math.max(progress, minimumProgress);  // Ensure at least 5% progress
  progress = Math.min(progress, 100);              // Ensure it doesn't exceed 100%

  return progress;
}

// Function to format the date
function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Main function to update the tracking page
async function updateTrackingPage() {
  const params = getQueryParams();
  const orderId = params.orderId;
  const productId = params.productId;

  try {
    const order = await getOrder(orderId);   // Assuming getOrder is asynchronous
    const product = await getProduct(productId); // Assuming getProduct is asynchronous
    
    // Find the item in the order
    let item = order.items.find((item) => item.productId === productId);

    // Format dates
    const formattedOrderDate = formatDate(order.timestamp); // Use timestamp
    const formattedDeliveryDate = formatDate(item.deliveryDate);

    // Calculate the progress percentage
    const progressPercent = calculateProgress(order.timestamp, item.deliveryDate);


    // Build the tracking HTML
    let trackingHtml = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formattedDeliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${item.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${progressPercent >= 0 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${progressPercent >= 50 ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${progressPercent === 100 ? 'current-status' : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    `;

    // Update the page content
    let main = document.querySelector(".main");
    main.innerHTML = trackingHtml;

  } catch (error) {
    console.error("Error fetching order or product data:", error);
    let main = document.querySelector(".main");
    main.innerHTML = "<p>Failed to load tracking information. Please try again later.</p>";
  }
}

// Call the main function to update the page
updateTrackingPage();
