// Function to get query parameters from URL. Getting the products
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    name: params.get("name"),
    price: params.get("price"),
    size: params.get("size"),
    img: params.get("img"),
  };
}

function displayProductDetails() {
  const product = getQueryParams();
  const productContainer = document.getElementById("product-details");

  if (product.name && product.price && product.size && product.img) {
    productContainer.innerHTML = `
      <img src="${product.img}" alt="${
      product.name
    }" class="img-fluid mb-3" style="max-width: 300px; height: auto;">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Size: ${product.size || "One Size"}</p>
    `;
  } else {
    productContainer.innerHTML = "<p>No product data found.</p>";
  }
}

//Modal for orders
function showOrderSummary(orderDetails) {
  const modalContent = `
    <p><strong>Product:</strong> ${orderDetails.productName}</p>
    <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
    <p><strong>Total Price:</strong> $${(
      orderDetails.price * orderDetails.quantity
    ).toFixed(2)}</p>
    <p><strong>Name:</strong> ${orderDetails.firstName} ${
    orderDetails.lastName
  }</p>
    <p><strong>Email:</strong> ${orderDetails.email}</p>
    <p><strong>Address:</strong> ${orderDetails.address}</p>
    <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
  `;
  //Modal
  document.getElementById("orderSummaryContent").innerHTML = modalContent;

  const orderModal = new bootstrap.Modal(
    document.getElementById("orderSummaryModal")
  );
  orderModal.show();
}

// Handle form submission
document
  .getElementById("order-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = getQueryParams();

    const orderDetails = {
      productName: product.name,
      price: parseFloat(product.price),
      quantity: parseInt(formData.get("quantity")),
      firstName: formData.get("name"),
      lastName: formData.get("surname"),
      email: formData.get("email"),
      address: formData.get("address"),
      paymentMethod: "Cash on Delivery",
    };

    showOrderSummary(orderDetails);

    event.target.reset();
  });

window.onload = displayProductDetails;
