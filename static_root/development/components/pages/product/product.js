import { addToCartFunc } from "../../common_componentc/header/cart";
import { form_send } from "../../module/form_action";

const checkboxModal = document.querySelector(".checkbox-modal");

const openCheckboxModal = () => {
  checkboxModal.closest(".overlay").classList.add("active");
  checkboxModal.classList.add("active");
};

// form (checkboxes)
const checkboxItems = document.querySelector(".product__checkbox-items");

const firstChecboxColor = checkboxItems.querySelector(
  ".product__checkbox-colors input"
);
const firstChecboxSize = checkboxItems.querySelector(
  ".product__checkbox-sizes input"
);

export const checkboxState = {
  color: {
    id: firstChecboxColor?.id,
    title: firstChecboxColor?.dataset.title,
  },
  size: {
    id: firstChecboxSize?.id,
    title: firstChecboxSize?.dataset.title,
  },
};

checkboxItems.addEventListener("click", ({ target }) => {
  const checkboxItem = target.closest(".product__checkbox");
  const checkboxItemInput = target.closest(".product__checkbox input");
  const checkboxItemLabelSpan = checkboxItem.querySelector("label span");

  if (checkboxItemInput) {
    checkboxItemLabelSpan.textContent = target.dataset.title;

    if (checkboxItem.closest(".product__checkbox-colors")) {
      checkboxState.color = {
        id: target.id,
        title: target.dataset.title,
      };
    }

    if (checkboxItem.closest(".product__checkbox-sizes")) {
      checkboxState.size = {
        id: target.id,
        title: target.dataset.title,
      };
    }
  }
});

//add to cart
const addToCartBtn = document.querySelector(".product__add-to-cart-btn");
addToCartBtn.addEventListener("click", () => {
  const id = addToCartBtn.dataset.id;
  const name = addToCartBtn.dataset.title;
  const price = addToCartBtn.dataset.price;

  const productObj = {
    id,
    count: 1,
    name,
    price,
    ...checkboxState,
  };

  if (checkboxState.color.id && checkboxState.size.id) {
    addToCartFunc(productObj);
  } else {
    openCheckboxModal();
  }
});

// quickly shop
const buyBtn = document.querySelector(".product__buy-btn");

buyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  form_send(".quckly_shop_form-product", false, {
    product_color: checkboxState.color.id,
    product_size: checkboxState.size.id,
  });
});

// toggle spicifications body
const specificationsHead = document.querySelector(
  ".product__details-specifications-head"
);
const specificationsBody = document.querySelector(
  ".product__details-specifications-body"
);

specificationsHead.addEventListener("click", () =>
  specificationsBody.classList.toggle("active")
);
