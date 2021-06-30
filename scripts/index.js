//Récupérer les oursons depuis API 
  
main();

function main() {
  getArticles();
}


function getArticles(){
    fetch("http://localhost:3000/api/teddies")
        .then(function(res){
            return res.json();
    })
        .catch((error) => {
            let teddyContainer = document.querySelector(".teddy-container");
            teddyContainer.innerHTML = "Impossible d'afficher les nounours. Etes-vous sur le port 3000?";
        })

//Mettre oursons dans le DOM
        .then(function (resultatAPI) {
            const articles = resultatAPI;
            for (let article in articles) {
              let productCard = document.createElement("div");
              document.querySelector(".products").appendChild(productCard);
              productCard.classList.add("product");
      
              let productLink = document.createElement("a");
              productCard.appendChild(productLink);
              productLink.href = `product.html?id=${resultatAPI[article]._id}`;
              productLink.classList.add("stretched-link");
      
              let productImgDiv = document.createElement("div");
              productLink.appendChild(productImgDiv);
              productImgDiv.classList.add("product-img");
      
              let productImg = document.createElement("img");
              productImgDiv.appendChild(productImg);
              productImg.src = resultatAPI[article].imageUrl;
      
              let productInfosDiv = document.createElement("div");
              productLink.appendChild(productInfosDiv);
              productInfosDiv.classList.add("product-infos");
      
              let productInfoTitle = document.createElement("div");
              productInfosDiv.appendChild(productInfoTitle);
              productInfoTitle.classList.add("product-infos-title");
              productInfoTitle.innerHTML = resultatAPI[article].name;
      
              let productInfoPrice = document.createElement("div");
              productInfosDiv.appendChild(productInfoPrice);
              productInfoPrice.classList.add("product-infos-price");
              productInfoPrice.innerHTML = resultatAPI[article].price;
            }

        })
      
}   
