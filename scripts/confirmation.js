main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const orderId = document.querySelector(".orderid span");
  orderId.innerText = localStorage.getItem("orderId");

  //On vide le LS pour le prochain process d'achat
  localStorage.clear(); 
}