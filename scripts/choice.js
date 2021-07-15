
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const container = document.querySelector(".container");

const productCaseImage = document.querySelector(".img");
const productCaseName = document.querySelector(".product-case-infos-title");
const productCaseDescription = document.querySelector(".product-case-infos-description");
const productCasePrice = document.querySelector(".product-case-infos-price");

const addBtn = document.querySelector(".add-to-cart");
const bearQuantity = document.querySelector("#quantity");


if (id) {
  getArticle();
} else {
  displayError();
}

addToCart

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

addToCart();

function addToCart() {
  addBtn.addEventListener("click", () => {
    if (bearQuantity.value > 0) {
      const productAdded = {
        name: productCaseName.innerHTML,
        price: parseFloat(productCasePrice),
        quantity: parseFloat(bearQuantity),
        _id: id,
      };
    }
  });


//Gestion du local storage
//Création du tableau qui contiendra nos produits 
  const arrayProducts = [];

//Si le LS est déjà rempli on y accède avec getItem
  if (localStorage.getItem("products") !== null) {
    arrayProducts = JSON.parse(localStorage.getItem("products"));
    
    
 // Si le LS est vide, on le crée avec le produit ajouté
  } 
    arrayProducts.push(productAdded);
    localStorage.setItem("products", JSON.stringify(arrayProducts));
}
