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
console.log(checkboxState);

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
