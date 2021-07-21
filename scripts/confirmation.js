displayId();

function displayId() {
    const orderId = document.querySelector(".order-id");
    orderId.innerText = localStorage.getItem("orderId");
}