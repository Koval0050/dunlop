import "./index.scss";
import validation from "../../module/validation/index";
import { instance } from "../../../api/instance";

form_send(".quckly_shop_form");
form_send(".order-form", false);
form_send(".form-write-review", false);

export function form_send(wrapper, modal, additionalData = {}) {
  let form_wrapper = document.querySelectorAll(wrapper);
  let loader = document.querySelector(".modal_loading__block");

  form_wrapper.forEach((element) => {
    let action = element.getAttribute("action");

    let btn = element.querySelector(".validation_btn");
    if (btn != null) {
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        let status = validation(btn);

        if (status == true) {
          console.log("send!");
          let elements = element.elements;
          let obj = {
            ...additionalData,
          };

          for (let i = 0; i < elements?.length; i++) {
            let item = elements.item(i);
            let check_type = ["file", "reset", "submit", "button"].indexOf(
              item.type
            );
            if (check_type > -1) {
            } else {
              obj[item.name] = item.value;
            }
          }

          obj["product"] = document.querySelector(wrapper).dataset.id;

          if (document.querySelector(wrapper).dataset.count) {
            obj["count"] = document.querySelector(wrapper).dataset.count;
          }

          console.log("wrapper: ", wrapper);
          console.log("іфв: ");

          if (action) {
            loader.classList.add("active");

            try {
              const data = await instance.post(action, obj);

              console.log("data1: ", data);
              accept_modal();
              return data;
            } catch (error) {
              console.log("error: ", error);

              bad_modal(error);
            }
          }
        } else {
          console.log("error!");
        }
      });
    } else {
      console.error(
        `такого модального вікна не існує на цій сторінці - ${wrapper}`
      );
    }
  });
}

export function bad_modal(error_message) {
  let loader = document.querySelector(".modal_loading__block");
  let bad = document.querySelector(".modal_bad__block");

  if (error_message) {
    console.log("error_message: ", error_message);
    let field_error = document.createElement("div");
    field_error.textContent = error_message;
    field_error.classList.add(
      "custom_modal_text",
      "modal_bad_text",
      "bold_title",
      "bold_title_2",
      "color_red"
    );
    console.log("field_error: ", field_error);
    bad.append(field_error);
  }

  setTimeout(() => {
    loader.classList.remove("active");
    bad.classList.add("active");
  }, 500);
  setTimeout(() => {
    bad.classList.remove("active");
  }, 2000);
}

export function accept_modal() {
  let loader = document.querySelector(".modal_loading__block");
  let accept = document.querySelector(".modal_accept__block");
  let inputs = document.querySelectorAll(".validation_input");

  setTimeout(() => {
    loader.classList.remove("active");
    accept.classList.add("active");
  }, 0);
  setTimeout(() => {
    accept.classList.remove("active");
  }, 4000);

  inputs.forEach((input) => (input.value = ""));
  document.querySelectorAll(".modal__block").forEach((modal) => {
    const qucklyShopForm = document.querySelector(".quckly_shop_form");
    const qucklyShopFormProduct = document.querySelector(
      ".quckly_shop_form-product"
    );

    modal.classList.remove("active");
    if (modal.closest(".overlay")) {
      modal.closest(".overlay").classList.remove("active");
    }

    if (qucklyShopForm) {
      qucklyShopForm.dataset.count = null;
      qucklyShopForm.dataset.id = null;
    }

    if (qucklyShopFormProduct) {
      qucklyShopFormProduct.dataset.count = null;
      qucklyShopFormProduct.dataset.id = null;
    }
  });
}

function remove_error() {
  let errors = document.querySelectorAll(".field_error");
  errors.forEach((error) => {
    error.remove();
  });

  let errors_modal = document.querySelectorAll(".custom_modal_text");
  errors_modal.forEach((error) => {
    error.remove();
  });
}
