displayOrderId();

function displayOrderId() {
  const orderId = document.querySelector(".orderid span");
  orderId.innerText = localStorage.getItem("orderId");

  //On vide le Local Storage pour le prochain processus d'achat
  localStorage.clear(); 
}