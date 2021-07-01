main();

function main();
getArticles();

function getArticles(){
    fetch("http://localhost:3000/api/teddies/${id}")
        .then(function(res){
            return res.json();
    })
        .catch((error) => {
            let productCase = document.querySelector(".product-case");
            productCase.innerHTML = "Impossible d'afficher le nounours. Etes-vous sur le port 3000?";
        })

}