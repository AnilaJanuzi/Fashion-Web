// Nese faqja  behet refresh, fshin cartCount nga sessionStorage
if (performance.navigation.type === 1) {
  //TYPE_RELOAD
  sessionStorage.removeItem("cartCount");
}

// Merr numrin nga sessionStorage
let cartCount = sessionStorage.getItem("cartCount")
  ? parseInt(sessionStorage.getItem("cartCount"))
  : 0;

// Gjen span-in ku shfaqet numri i cart-it ne header
const cartCountSpan = document.querySelector(".cart-count");
if (cartCountSpan) {
  cartCountSpan.textContent = cartCount;
}

const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    if (cartCountSpan) {
      cartCountSpan.textContent = cartCount;
    }
    sessionStorage.setItem("cartCount", cartCount);
  });
});
