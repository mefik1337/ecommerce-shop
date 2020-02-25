const order = document.querySelector('.order__column');
const proceedBtn = document.querySelector('.order__proceed');
const updateTotalCost = () => {
  const totalCost = localStorage.getItem('totalCost');
  const total = document.querySelector('.order__total-text');
  if (totalCost && order) total.innerText = `$ ${totalCost}`;
};

const changeSinglePrice = e => {
  const quantityText = document.querySelectorAll('.product__quantity-text');
  let cartItems = localStorage.getItem('InCart');
  cartItems = JSON.parse(cartItems);
  const filteredItems = Object.values(cartItems).filter(
    item => item.id === e.target.dataset.tag
  );
  const eachElement = cartItems[filteredItems[0].id];
  quantityText.forEach(item => {
    if (item.dataset.tag === e.target.dataset.tag) {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = eachElement.inCart;
    }
  });
  const price = document.querySelectorAll('.product__price-text');
  price.forEach(item => {
    if (e.target.dataset.tag === item.dataset.tag) {
      // eslint-disable-next-line no-param-reassign
      item.innerHTML = `$ ${eachElement.inCart * eachElement.price}`;
    }
  });
};
const addQuantity = e => {
  e.preventDefault();
  const counter = document.querySelector('.cart__counter');
  let cartItems = localStorage.getItem('InCart');
  let totalCost = localStorage.getItem('totalCost');
  let cartValue = localStorage.getItem('Cart Value');
  cartValue = parseInt(cartValue, 10);
  totalCost = parseInt(totalCost, 10);
  cartItems = JSON.parse(cartItems);
  const filteredItems = Object.values(cartItems).filter(
    item => item.id === e.target.dataset.tag
  );
  if (filteredItems) {
    const eachElement = cartItems[filteredItems[0].id];
    const { price } = eachElement;
    eachElement.inCart += 1;
    localStorage.setItem('Cart Value', cartValue + 1);
    counter.innerText = cartValue + 1;
    localStorage.setItem('InCart', JSON.stringify(cartItems));
    localStorage.setItem('totalCost', totalCost + parseInt(price, 10));
    changeSinglePrice(e);
  }
  updateTotalCost();
};
const minusQuantity = e => {
  e.preventDefault();
  let cartItems = localStorage.getItem('InCart');
  let totalCost = localStorage.getItem('totalCost');
  const counter = document.querySelector('.cart__counter');
  let cartValue = localStorage.getItem('Cart Value');
  cartValue = parseInt(cartValue, 10);
  totalCost = parseInt(totalCost, 10);
  cartItems = JSON.parse(cartItems);
  const filteredItems = Object.values(cartItems).filter(
    item => item.id === e.target.dataset.tag
  );
  if (filteredItems) {
    const eachElement = cartItems[filteredItems[0].id];
    const { price } = eachElement;
    eachElement.inCart -= 1;
    localStorage.setItem('Cart Value', cartValue - 1);
    counter.innerText = cartValue - 1;
    localStorage.setItem('InCart', JSON.stringify(cartItems));
    localStorage.setItem('totalCost', totalCost - parseInt(price, 10));
    changeSinglePrice(e);
  }
  if (cartItems[e.target.dataset.tag].inCart < 1) {
    const element = cartItems;
    delete element[e.target.dataset.tag];
    localStorage.setItem('InCart', JSON.stringify(element));
    e.target.parentElement.parentElement.parentElement.remove();
  }
  updateTotalCost();
};
const deleteOneItem = e => {
  let cartItems = localStorage.getItem('InCart');
  const counter = document.querySelector('.cart__counter');
  let totalCost = localStorage.getItem('totalCost');
  let cartValue = localStorage.getItem('Cart Value');
  const total = document.querySelector('.order__total-text');
  cartValue = parseInt(cartValue, 10);
  totalCost = parseInt(totalCost, 10);
  cartItems = JSON.parse(cartItems);
  const item = cartItems;
  const cartItem = item[e.target.parentElement.dataset.tag];
  const inCart = parseInt(cartItem.inCart, 10);
  const price = parseInt(cartItem.price, 10);
  localStorage.setItem('Cart Value', cartValue - inCart);
  localStorage.setItem('totalCost', totalCost - price * inCart);
  delete item[e.target.parentElement.dataset.tag];
  localStorage.setItem('InCart', JSON.stringify(item));
  counter.innerText = `${cartValue - inCart}`;
  total.innerText = `$ ${totalCost - price * inCart}`;
  e.target.parentElement.remove();
};
const proceedItems = () => {
  // eslint-disable-next-line no-alert
  alert('Successful proceed!');
  localStorage.clear();
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

const getInCartItems = () => {
  let inCart = localStorage.getItem('InCart');
  inCart = JSON.parse(inCart);
  if (inCart && order) {
    Object.values(inCart).map(
      // eslint-disable-next-line no-return-assign
      item =>
        (order.innerHTML += `
                <div class="order__row" data-tag="${item.id}">
                <div class="order__item">
                    <p class="product__name" data-tag="${item.id}">${
          item.name
        }</p>
                    <div class="product__overall">
                        <span class="product__quantity" >Quantity:</span>
                        <button class="product__minus" data-tag="${
                          item.id
                        }">-</button>
                        <span class="product__quantity-text" data-tag="${
                          item.id
                        }">${item.inCart}</span>
                        <button class="product__plus" data-tag="${
                          item.id
                        }">+</button>
                        <p class="product__price">Price: <span data-tag="${
                          item.id
                        }" class="product__price-text">$ ${item.price *
          item.inCart}</span></p>
                    </div>
                </div>
                <button class="order__btn--close">X</button>
            </div>
        </div>
    `)
    );
  }
};
document.querySelector('body').addEventListener('click', event => {
  if (!event.target) {
    return;
  }
  if (event.target.matches('.product__plus')) {
    addQuantity(event);
  }
  if (event.target.matches('.product__minus')) {
    minusQuantity(event);
  }
  if (event.target.matches('.order__btn--close')) {
    deleteOneItem(event);
  }
});
if (proceedBtn) {
  proceedBtn.addEventListener('click', proceedItems);
  getInCartItems();
  updateTotalCost();
}
