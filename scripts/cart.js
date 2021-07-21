let cart = document.querySelector(".cart-detail");
let copyLocalStorage = JSON.parse(localStorage.getItem("products"));

function main() {
    displayCart();
}

function displayCart() {
    let test = document.querySelector(".empty-cart");
    for (let produit in copyLocalStorage) {
        let productRow = document.createElement("div");
        cart.insertBefore(productRow, test);
        productRow.classList.add("cart-detail", "product-row");

        let productName = document.createElement("div");
        productRow.appendChild(productName);
        productName.classList.add("cart-detail-bear-name");
        productName.innerHTML = copyOfLS[produit].name;

        let productQuantity = document.createElement("div");
        productRow.appendChild(productQuantity);
        productQuantity.classList.add("cart-detail-quantity");
        productQuantity.innerHTML = copyOfLS[produit].quantity;

        let productPrice = document.createElement("div");
        productRow.appendChild(productPrice);
        productPrice.classList.add("cart-detail-price");

    }

}

const submit = document.querySelector(".order");
let inputName = document.querySelector("#name");
let inputLastName = document.querySelector("#last-name");
let inputMail = document.querySelector("#email");
let inputAdress = document.querySelector("#adress");
let inputCity = document.querySelector("#city");

displayAlert();

function displayAlert() {
    submit.addEventListener("click", () => {
        if (!inputName.value ||
            !inputLastName.value ||
            !inputMail ||
            !inputCity ||
            !inputAdress) {
            alert("Veuillez remplir tous les champs");
        }
    })
}