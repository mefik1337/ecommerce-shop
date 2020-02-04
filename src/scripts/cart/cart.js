import products from './products/products';

const cartBtn = document.querySelectorAll('.cart__buy-btn');
const counter = document.querySelector('.cart__counter');

const passTheProduct = product => {
  const { id } = product;
  let cartItems = localStorage.getItem('InCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems !== null) {
    if (typeof cartItems[id] === 'undefined')
      cartItems = { ...cartItems, [product.id]: product };
    cartItems[id].inCart += 1;
  } else {
    // eslint-disable-next-line no-param-reassign
    product.inCart = 1;
    cartItems = {
      [product.id]: product,
    };
  }
  localStorage.setItem('InCart', JSON.stringify(cartItems));
};

const cartCounterToStorage = product => {
  let cartValue = localStorage.getItem('Cart Value');
  cartValue = parseInt(cartValue, 10);
  if (!cartValue) {
    localStorage.setItem('Cart Value', 1);
    counter.innerText = 1;
  } else {
    localStorage.setItem('Cart Value', cartValue + 1);
    counter.innerText = cartValue + 1;
  }
  passTheProduct(product);
};

const displayCounterToCart = () => {
  counter.innerText = localStorage.getItem('Cart Value');
};

cartBtn.forEach(btn => {
  const dataId = btn.dataset.id;
  const eachProduct = products[dataId];
  btn.addEventListener('click', () => {
    cartCounterToStorage(eachProduct);
  });
});

displayCounterToCart();
