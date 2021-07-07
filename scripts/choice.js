
let params = new URL(document.location).searchParams;
let id = params.get("id");

const productCaseImage = document.querySelector(".img");
const productCaseName = document.querySelector(".product-case-infos-title");
const productCaseDescription = document.querySelector(".product-case-infos-description");
const productCasePrice = document.querySelector(".product-case-infos-price");


  getArticles();


function getArticles() {
  // On récupère le produit cliqué sur l'index
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Erreur, êtes-vous sur le port 3000?";
    })
    .then(function (resultatAPI) {
      // On place les données reçues via l'API aux bons endroits sur la page
      article = resultatAPI;
      productCaseName.innerHTML = article.name;
      productCaseImage.src = article.imageUrl;
      productCaseDescription.innerText = article.description;

      // Prix en euros
      article.price = article.price / 100;
      productCasePrice.innerText = article.price + "€";
    })
}
