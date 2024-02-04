import {
  input_basket,
  plus,
  minus,
  delete_item,
} from "../../module/shop_scripts/basket_action";
import { addToCart, updateCartItem, removeCartItem } from "../../../api/cart";

// open and close cart
const cartOverlay = document.querySelector(".cart-overlay");
document.body.addEventListener("click", (e) => {
  if (e.target === cartOverlay) {
    cartOverlay.classList.remove("active");
  }
});

document.addEventListener("click", ({ target }) => {
  if (target.closest(".open-cart-btn")) {
    cartOverlay.classList.add("active");
  }

  if (target.closest(".close-cart-btn")) {
    cartOverlay.classList.remove("active");
  }
});

// Add mark when cart have some product
export const toggleCartMark = (cartItems) => {
  const cartMarks = document.querySelectorAll(".header-new__cart-mark");

  if (cartItems?.length) {
    cartMarks.forEach((item) => item.classList.add("active"));
  } else {
    cartMarks.forEach((item) => item.classList.remove("active"));
  }
};

//update cart total price
export const updateCartTotalPrice = (totalPrice) => {
  const cartTotalPrice = document.querySelector(
    ".cart__total-price-count span"
  );
  cartTotalPrice.textContent = totalPrice;
};

// render Cart Items
const cartItems = document.querySelector(".cart__items");

const renderCartItem = ({
  id,
  product_color,
  product_size,
  quantity,
  total_price,
  product,
}) => {
  return `<div class="cart__item" data-product-id="${product.id}" data-id="${id}" data-quantity="${product.quantity}">
            <button class="cart__item-remove">
              <img src="/static/source/img/x-mark.svg" alt="x-mark" />
            </button>
            <img
            src="${product.image}" alt="${product.title}"
            />
            <div class="cart__item-info">
              <h4 class="cart__item-title" data-title="${product.title}">${product.title}</h4>
              <div class="cart__item-params">
                <p>Колір:<span>${product_color.title}</span></p>
                <p>Розмір:<span>${product_size.title}</span></p>
              </div>
              <div class="cart__item-bottom">
                <div class="counter"">
                  <button class="counter__minus-btn">-</button>
                  <input class="counter__value" type="number" value="${quantity}" />
                  <button class="counter__plus-btn">+</button>
                </div>
                <p class="cart__item-price"><span data-price="${total_price}">${total_price}</span>грн</p>
              </div>
            </div>
          </div>`;
};

//Re-render cart items
export const renderCartItems = (currentCartItems) => {
  const newCartItems = currentCartItems?.map((item) => renderCartItem(item));

  if (newCartItems) {
    cartItems.innerHTML = newCartItems.join("");
  }
};

// add to cart
export const addToCartFunc = async ({
  id,
  color,
  size,
  count,
  name,
  price,
}) => {
  await addToCart({
    product: id,
    product_color: color.id,
    product_size: size.id,
    quantity: count,
  });

  cartOverlay.classList.add("active");
};

// remove cart item
cartItems.addEventListener("click", async ({ target }) => {
  if (target.closest(".cart__item-remove")) {
    const cartItemId = target.closest(".cart__item").dataset.id;

    delete_item(target, ".cart__item");
    await removeCartItem(cartItemId);
  }
});

// counter product-item
const cart = document.querySelector(".cart");

cart.addEventListener("click", async ({ target }) => {
  const cartItem = target.closest(".cart__item");
  if (cartItem) {
    const cartItemId = cartItem.dataset.id;
    const quantity = Number(cartItem.dataset.quantity);
    const quantityInCart = Number(
      cartItem.querySelector(".counter__value").value
    );
    const isValidQuantity = quantityInCart < quantity;

    if (target.className === "counter__plus-btn" && isValidQuantity) {
      const counterValue = plus(".counter", ".counter__value", target);

      await updateCartItem(cartItemId, { quantity: counterValue });
    } else if (
      target.className === "counter__minus-btn" &&
      quantityInCart > 1
    ) {
      const counterValue = minus(".counter", ".counter__value", target);

      await updateCartItem(cartItemId, { quantity: counterValue });
    }
  }
});

cart.addEventListener("change", async ({ target }) => {
  const cartItem = target.closest(".cart__item");

  if (target.className === "counter__value" && cartItem) {
    const cartItemId = cartItem.dataset.id;
    const quantity = Number(cartItem.dataset.quantity);

    const counterInput = cartItem.querySelector(".counter__value");
    const counterValue = input_basket(counterInput);

    if (counterValue > quantity) {
      counterInput.value = quantity;
      await updateCartItem(cartItemId, { quantity });
    }

    if (counterValue < quantity) {
      await updateCartItem(cartItemId, { quantity: counterValue });
    }
  }
});
