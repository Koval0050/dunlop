import { addToCartFunc } from "../../common_componentc/header/cart";
import { form_send } from "../../module/form_action";

//checkbox
const checboxColor = document.querySelector(".product__checkbox-colors input");
const checboxSize = document.querySelector(".product__checkbox-sizes input");

export const checkboxState = {
  color: {
    id: checboxColor?.id,
    title: checboxColor?.dataset.title,
  },
  size: {
    id: checboxSize?.id,
    title: checboxSize?.dataset.title,
  },
};

//func change checkBox
const checkboxItems = document.querySelector(".product__checkbox-items");
checkboxItems.addEventListener("click", (e) => {
  const checkbox = e.target.closest(".product__checkbox");
  const checkboxInput = e.target.closest(".product__checkbox input");
  const checkboxLabelSpan = checkbox.querySelector("label span");

  if (checkboxInput) {
    checkboxLabelSpan.textContent = e.target.dataset.title;

    if (checkbox.closest(".product__checkbox-colors")) {
      checkboxState.color = {
        id: e.target.id,
        title: e.target.dataset.title,
      };
    }

    if (checkbox.closest(".product__checkbox-sizes")) {
      checkboxState.size = {
        id: e.target.id,
        title: e.target.dataset.title,
      };
    }
  }
});

//open quick shop
const qucklyShopBtn = document.querySelector(".product__buy-btn");
qucklyShopBtn.addEventListener("click", (e) => {
  e.preventDefault();

  form_send(".quckly_shop_form-product", false, {
    product_color: checkboxState.color.id,
    product_size: checkboxState.size.id,
  });
});

const checkboxModal = document.querySelector(".checkbox-modal");

const openCheckboxModal = () => {
  checkboxModal.closest(".overlay").classList.add("active");
  checkboxModal.classList.add("active");
};

//add to cart
const addToCartBtn = document.querySelector(".product__add-to-cart-btn");
addToCartBtn.addEventListener("click", () => {
  const id = addToCartBtn.dataset.id;
  const name = addToCartBtn.dataset.title;
  const price = addToCartBtn.dataset.price;
  const product = {
    id,
    count: 1,
    name,
    price,
    ...checkboxState,
  };

  if (checkboxState.color.id) {
    console.log(addToCartFunc);
    addToCartFunc(product);
  } else {
    openCheckboxModal();
  }
});

//open specification
const specificationsHead = document.querySelector(
  ".product__details-specifications-head"
);
const specificationsBody = document.querySelector(
  ".product__details-specifications-body"
);

specificationsHead.addEventListener("click", () =>
  specificationsBody.classList.toggle("active")
);
