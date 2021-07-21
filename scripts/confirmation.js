fetch(`http://localhost:3000/api/teddies/order`)


main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}