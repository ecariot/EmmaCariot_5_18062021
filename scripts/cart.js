const cart = document.querySelector(".cart-global");
let products = JSON.parse(localStorage.getItem("products")) ?? [];

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  displayTotal();
  clearCart();
  postRequest();
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
    console.log(productTrash);
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
 

function postRequest() {

  // On récupère les inputs depuis le DOM.
  const submit = document.querySelector("#order");
  let inputName = document.querySelector("#name");
  let inputLastName = document.querySelector("#last-name");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#adress");
  let inputMail = document.querySelector("#email");

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      !inputName.value ||
      !inputLastName.value ||
      !inputCity.value ||
      !inputAdress.value ||
      !inputMail.value 
    ) {
      alert("Veuillez renseigner tous les champs");
      e.preventDefault();
    } else {

        const contact = {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value
        };
        console.log(contact);

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
          console.log(options);
        fetch(`http://localhost:3000/api/teddies/order`, options)
        .then((response) => {
          console.log(response);
        return response.json()})
        .then((data) => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html";
      })
    .catch(error => console.log(error));
  }});  

}
