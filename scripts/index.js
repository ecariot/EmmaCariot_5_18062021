//Récupérer les oursons depuis API 
  
  getArticles();



function getArticles(){
    fetch(`http://localhost:3000/api/teddies`)
        .then(function(res){
            return res.json();
    })
        .catch((error) => {
            let teddyContainer = document.querySelector(".teddy-container");
            teddyContainer.innerHTML = "Impossible d'afficher les nounours. Etes-vous sur le port 3000?";
        })

//Mettre oursons dans le DOM
        .then(function (articles) {
            for (const article of articles) {
              const productCard = document.createElement("div");
              document.querySelector(".products").appendChild(productCard);
              productCard.classList.add("product");
      
              const productLink = document.createElement("a");
              productCard.appendChild(productLink);
              productLink.href = `choice.html?id=${article._id}`;
      
              let productImgDiv = document.createElement("div");
              productLink.appendChild(productImgDiv);
              productImgDiv.classList.add("product-img");
      
              let productImg = document.createElement("img");
              productImgDiv.appendChild(productImg);
              productImg.src = article.imageUrl;
      
              let productInfosDiv = document.createElement("div");
              productLink.appendChild(productInfosDiv);
              productInfosDiv.classList.add("product-infos");
      
              let productInfoTitle = document.createElement("div");
              productInfosDiv.appendChild(productInfoTitle);
              productInfoTitle.classList.add("product-infos-title");
              productInfoTitle.innerHTML = article.name;
      
              let productInfoPrice = document.createElement("div");
              productInfosDiv.appendChild(productInfoPrice);
              productInfoPrice.classList.add("product-infos-price");
              productInfoPrice.innerHTML = article.price/100 + "€" ;
            }

        })
      
}   
