const cart = document.querySelector(".cart-global");
let products = JSON.parse(localStorage.getItem("products")) ?? [];
const submit = document.querySelector("#order");

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  displayTotal();
  clearCart();
  postRequest();

  const inputs = [...document.querySelectorAll(".form input")];

  listenInputs(inputs); 
})
 


function displayCart() {
  let emptyCart = document.querySelector(".if-empty-cart");
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

    let productTrash = document.createElement("button");
    productRow.appendChild(productTrash);
    productRow.classList.add("delete-article");
    productTrash.innerHTML = "supprimer";

    productTrash.addEventListener("click", (e) => {
      products = products.filter( el => el._id !== produit._id);
      localStorage.setItem("products", JSON.stringify(products));
      e.target.closest(".cart-detail.delete-article").remove();
      displayTotal();
    })
    if (localStorage.getItem("products")) {
      emptyCart.style.display = "none";
    }
  }
}

function displayTotal() {
  let sum = 0;
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
    if (localStorage.getItem("products") === null) {
      buttonToEmptyCart.style.display = "none";
    }
  }
 

function postRequest() {

  const form = document.querySelector(".form");
  if (localStorage.getItem("products") === null) {
    form.style.display = "none";
  }

  // On récupère les inputs depuis le DOM.
  
  let inputName = document.querySelector("#name");
  let inputLastName = document.querySelector("#lastName");
  let inputCity = document.querySelector("#city");
  let inputAddress = document.querySelector("#address");
  let inputMail = document.querySelector("#email");

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      !inputName.value ||
      !inputLastName.value ||
      !inputCity.value ||
      !inputAddress.value ||
      !inputMail.value 
    ) {
      alert("Veuillez renseigner tous les champs");
      e.preventDefault();
    } else {

        const contact = {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAddress.value,
          city: inputCity.value,
          email: inputMail.value
        };

        const productsId = products.map(el => el._id)
        /*let productsId = [];
        for(let product of products){
          productsId.push(product._id);
        }*/
        const options = {
          method: "POST",
          body: JSON.stringify({
            contact: contact,
            products: productsId,
          }),
          headers: {"Content-Type": "application/json"},
          };
        fetch(`http://localhost:3000/api/teddies/order`, options)
        .then((response) => {
        return response.json()})
        .then((data) => {
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html";
      })
    .catch(error => (error));
  }});  

}

function listenInputs(inputs) {
  for(let input of inputs){
    input.addEventListener('change', () => {
      validInput(input);
    })
  }
}

function validInput(input) {
  switch(input.name){
    case "name":
    case "lastName":
    case "city":
      const alphaRegExp = new RegExp(
        '^[a-zA-Z]{2,30}$', 'g'
      );
      displaySmall(input, alphaRegExp);
      break;
    case "email":
      const emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
      );
      displaySmall(input, emailRegExp);
      break;
    case "address":
      const addressRegExp = new RegExp(
        '^[a-zA-Z0-9 ]{2,40}$', 'g'
      );
      displaySmall(input, addressRegExp);
      break;
  }
}

function displaySmall(input, regExp) {
  const small = input.closest("div").querySelector("small");
  if(regExp.test(input.value)){
    small.innerHTML = "Champ Valide";
    submit.style.display = "block";
  } else {
    small.innerHTML = "Champ non valide";
    submit.style.display = "none";
  }
}