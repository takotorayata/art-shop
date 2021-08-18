//    MENU:
function togNav() {
  var nav = document.getElementById("menu");
  var basket = document.getElementById("basket1");
    if (nav.style.width == '420px') {
    nav.style.width = '0';
    nav.style.opacity = 1;
    basket.style.opacity = 1;
  } else {
    nav.style.width = "420px";
    nav.style.opacity = 1;
    basket.style.opacity = 0;
    }
}

//    ART-CONTENT:
function openSection(id) {
    let element = document.getElementById(id);
    element.style.width = "100%";
    showSlides(1, element);
}

function closeSection(id) {
    document.getElementById(id).style.width = "0%";
}

//    SLIDER:
var slideIndex = 1;
var slides = null;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n, el) {
    if (el) {
        slides = el.getElementsByClassName("product");      
    }
    if (n > slides.length) {
        n = 1;
    }
    else if (n < 1) {
        n = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex = n;

    slides[n-1].style.display = "block";
}

//    CART:
let cart = (JSON.parse(localStorage.getItem(".cart")) || []);
const cartDOM = document.querySelector(".cart");
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
const deleteNoItemsInTheCart = document.getElementById("delete");
const itemsDOM = document.querySelector(".items");
const prices0Dom = document.querySelector(".pricesDom");
const totalPrice = document.getElementById("total");
const totalPriceDom =  document.querySelector(".total1");

//    add to cart:
addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.addEventListener("click", () => {
        const productDOM = addToCartButtonDOM.parentNode;
        const product = {
            name: productDOM.querySelector("#product__name").innerText,
            price: productDOM.querySelector("#product__price").innerText,
            quantity: 1,
        };
        const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
        if (!isInCart) {
            insertItemToDOM(product);
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            addToCartButtonDOM.innerText = "In Cart";
            deleteNoItemsInTheCart.remove();
            totalPriceDom1();
        }
    });
});

//    display items, which were added to cart, in a basket message:
function insertItemToDOM(product) {
    cartDOM.insertAdjacentHTML("beforeend", `
    <p class = "cartItems">${product.name}<br>${product.price}</p>`);
}

//    delete all:
function deleteAllButton() {
    cartDOM.remove();
    itemsDOM.insertAdjacentHTML("beforeend", `<p class="noItems">No
    items in the cart</p>`);
    totalPriceDom.remove();
    prices0Dom.insertAdjacentHTML("beforeend", `<p class="prices0Dom">Total price: 0$</p>`);
}

// calculate total price
function calculateTotalPrice() {
  return cart.reduce((acc, cartItem) => {
    const price = parseInt(cartItem.price.slice(0, cartItem.price.length - 1));
    const quantity = cartItem.quantity;
    return acc + price * quantity;
  }, 0);
}

//    display total price in a basket message:
function totalPriceDom1() {
    totalPrice.remove();
    const total = calculateTotalPrice();
    totalPriceDom.innerHTML = `<p class="totalPrice">Total price: ${total}$</p>`;
}
