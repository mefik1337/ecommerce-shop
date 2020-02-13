const order = document.querySelector('.order__column');

const updateTotalCost = () => {
  const totalCost = localStorage.getItem('totalCost');
  const total = document.querySelector('.order__total-text');
  if (totalCost && order) total.innerText = `$ ${totalCost}`;
};

const addQuantity = e => {
  e.preventDefault();
  const quantityText = document.querySelectorAll('.product__quantity-text');
  let cartItems = localStorage.getItem('InCart');
  let totalCost = localStorage.getItem('totalCost');
  totalCost = parseInt(totalCost, 10);
  cartItems = JSON.parse(cartItems);
  const filteredItems = Object.values(cartItems).filter(
    item => item.id === e.target.dataset.tag
  );
  const eachElement = cartItems[filteredItems[0].id];
  if (filteredItems) {
    eachElement.inCart += 1;
    localStorage.setItem('InCart', JSON.stringify(cartItems));
    // eslint-disable-next-line no-shadow
    const { price } = eachElement;
    localStorage.setItem('totalCost', totalCost + parseInt(price, 10));
  }
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
const getInCartItems = () => {
  let inCart = localStorage.getItem('InCart');
  inCart = JSON.parse(inCart);
  if (inCart && order) {
    Object.values(inCart).map(
      // eslint-disable-next-line no-return-assign
      item =>
        (order.innerHTML += `
                <div class="order__row">
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
    updateTotalCost();
  }
});
getInCartItems();
updateTotalCost();
