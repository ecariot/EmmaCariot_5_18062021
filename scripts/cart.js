const cart = document.querySelector(".cart-global");
const products = JSON.parse(localStorage.getItem("products")) ?? [];

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  displayTotal();
  clearCart();
})
 


function displayCart() {
  let test = document.querySelector(".empty-cart");

  //création de div pour les infos du panier
  for (let produit of products) {
    let productRow = document.createElement("div");
    cart.insertBefore(productRow, test);
    productRow.classList.add("cart-detail");

    let productName = document.createElement("div");
    productRow.appendChild(productName);
    productName.classList.add("cart-detail-title");
    productName.innerHTML = produit.name;

    let productQuantity = document.createElement("div");
    productRow.appendChild(productQuantity);
    productQuantity.classList.add("cart-detail-title", "cart-detail-quantity");
    productQuantity.innerHTML = produit.quantity;

    let productPrice = document.createElement("div");
    productRow.appendChild(productPrice);
    productPrice.classList.add("cart-detail-price");
    productPrice.innerHTML = (produit.price * produit.quantity) + "€";
  }
}

function displayTotal() {
  let sum = 0;
  console.log(products);
    for(let n = 0; n < products.length; n++){
        sum += products[n].quantity * products[n].price;
    }
    document.querySelector(".cart-total-value").innerHTML = sum + "€";
}

function clearCart() {
    const buttonToEmptyCart = document.querySelector(".empty-button");
    buttonToEmptyCart.addEventListener("click", () => {
      localStorage.clear();
    });
  }


//FORMULAIRE
const submit = document.querySelector(".order");
let inputName = document.querySelector("#name");
let inputLastName = document.querySelector("#last-name");
let inputMail = document.querySelector("#email");
let inputAdress = document.querySelector("#adress");
let inputCity = document.querySelector("#city");
