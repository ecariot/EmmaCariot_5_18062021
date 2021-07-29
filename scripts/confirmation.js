
displayConfirmation();


function displayConfirmation() {
  const orderId = document.querySelector(".display-order-id span");
  orderId.innerText = localStorage.getItem("orderId");
}