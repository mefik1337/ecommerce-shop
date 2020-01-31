const cartBtn = document.querySelectorAll('.cart__buy-btn');
const counter = document.querySelector('.cart__counter');

const cartCounterToStorage = () => {
  let cartValue = localStorage.getItem('Cart Value');
  cartValue = parseInt(cartValue, 10);
  if (!cartValue) {
    localStorage.setItem('Cart Value', 1);
    counter.innerText = 1;
  } else {
    localStorage.setItem('Cart Value', cartValue + 1);
    counter.innerText = cartValue + 1;
  }
};

const displayCounterToCart = () => {
  counter.innerText = localStorage.getItem('Cart Value');
};

cartBtn.forEach(btn => {
  btn.addEventListener('click', cartCounterToStorage);
});

displayCounterToCart();
