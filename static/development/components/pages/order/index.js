import "./index.scss";
import "./form.scss";
import "./summary.scss";
import "./thank-you-pop-up.scss";

//script
import './form'

//update cart total count
export const updateOrderTotalCount = (totalCount) => {
  const orderTotalCount = document.querySelector(
    ".summary__subtotal-title span"
  );
  const countTitle = totalCount === 1 ? "1 товар" : `${totalCount} товари`;

  orderTotalCount.textContent = countTitle;
};

//update cart total price
export const updateOrderTotalPrice = (totalPrice) => {
  const orderTotalPrice = document.querySelector(
    ".summary__subtotal-price span"
  );
  const orderTotalCost = document.querySelector(".summary__total-cost-number");

  orderTotalPrice.textContent = totalPrice;
  orderTotalCost.textContent = totalPrice;
};

// render Order Items
const orderItems = document.querySelector(".summary__items");

const renderOrderItem = ({
  id,
  product_color,
  product_size,
  quantity,
  total_price,
  product,
}) => {
  const productQuantity = quantity === 1 ? "1 пара" : `${quantity} пари`;

  return `<div data-id=${id} product-id="${product.id}" class="summary__item">
            <div class="summary__item-img">
              <img
                src="${product.image}"
                alt="${product.title}"
              />
              <span class="badge summary__item-badge"
                >${quantity}</span
              >
            </div>

            <div class="summary__item-info">
              <div class="summary__item-info-left">
                <h4 class="title summary__item-title">
                  ${product.title}
                </h4>
                <div class="summary__item-params">
                  <p>Колір:<span>${product_color.title}</span></p>
                  <p>Розмір:<span>${product_size.title}</span></p>
                </div>
                <p class="summary__item-count">
                  ${productQuantity}
                </p>
              </div>

              <div class="summary__item-info-right">
                <p class="summary__item-price">
                  <span>${total_price}</span>₴
                </p>
              </div>
            </div>
          </div>`;
};

export const renderOrderItems = (currentOrderItems) => {
  const newOrderItems = currentOrderItems?.map((item) => renderOrderItem(item));

  if (newOrderItems) {
    orderItems.innerHTML = newOrderItems.join("");
  }
};

export const updateOrder = (totalCount, totalPrice, currentOrderItems) => {
  if (orderItems) {
    updateOrderTotalCount(totalCount);
    updateOrderTotalPrice(totalPrice);
    renderOrderItems(currentOrderItems);
  }
};

export const openThanksPopUp = () => {
  document.querySelector(".thank-you-pop-up-overlay").classList.add("active");
  document.querySelector(".thank-you-pop-up").classList.add("active");
  document.querySelector(".modal_loading__block").classList.remove("active");
};
