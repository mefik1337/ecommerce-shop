const total = document.querySelector('.order__total-text');
const order = document.querySelector('.order__column');

const getTotalCost = () => {
  const totalCost = localStorage.getItem('totalCost');
  if (totalCost && order) total.innerText = `$ ${totalCost}`;
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
                        <span class="product__quantity">Quantity:</span>
                        <button class="product__minus" data-tag="${
                          item.id
                        }">-</button>
                        ${item.inCart}
                        <button class="product__plus" data-tag="${
                          item.id
                        }">+</button>
                        <p class="product__price">Price: <span>$ ${item.price *
                          item.inCart}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `)
    );
  }
};

getInCartItems();
getTotalCost();
