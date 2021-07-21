
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const container = document.querySelector(".container");

const productCaseImage = document.querySelector(".img");
const productCaseName = document.querySelector(".product-case-infos-title");
const productCaseDescription = document.querySelector(".product-case-infos-description");
const productCasePrice = document.querySelector(".product-case-infos-price");

const addBtn = document.querySelector(".add-to-cart");
const bearQuantity = document.querySelector("#quantity");

let teddy = {};


if (id) {
  getArticle();
  addToCart();
} else {
  displayError();
}



function displayError() {
  container.remove();
  document.querySelector(".error").style.display = "block";
}

function getArticle() {
  // On récupère le produit cliqué sur l'index
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      if (response.ok === false) {
        displayError();
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Erreur, êtes-vous sur le port 3000?";
    })
    .then(function (article) {
      // On place les données reçues de l'API aux bons endroits sur la page
      teddy = article;
      productCaseName.innerHTML = "Nom: " + article.name;
      productCaseImage.src = article.imageUrl;
      productCaseDescription.innerText = "Description: " + article.description;

      // Prix en euros
      article.price = article.price / 100;
      productCasePrice.innerText = "Prix : " + article.price + "€";

      for (const color of article.colors){
        const option = document.createElement("option");
        option.innerText = color;
        option.value = color;
        document.querySelector(".bear-color select").appendChild(option); 
      }
    })
};

function addToCart() {
  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (bearQuantity.value > 0) {
      teddy.quantity = parseInt(bearQuantity.value);
      addToLocalStorage(teddy);    
    }
  });
}

function addToLocalStorage(teddy) {
  let products = [];
  let exist = false;
  let index = null;
  if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"));
  }
  for(let i = 0; i < products.length; i++){
    if(id === products[i]._id){
      exist = true;
      index = i;
    }
  }
  if(exist === false){
    products.push(teddy);
  } else {
    products[index].quantity += parseInt(bearQuantity.value);
  }
  localStorage.setItem("products", JSON.stringify(products));
};