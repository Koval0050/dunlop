import { customSelectFunc } from "../../module/custom_select";
import { getCities, getDepartments } from "../../../api/order";
import { sendOrder } from "../../../api/order";

const orderForm = document.querySelector(".order__form");

if (orderForm) {
  customSelectFunc(".select-city");
  customSelectFunc(".select-department");

  getCities("а");
}

// Перенесення лейблу при введені тексту
const allContactFieldsInputs = document.querySelectorAll(
  ".form__contacts-field input"
);
const allContactFieldsTextarea = document.querySelectorAll(
  ".form__contacts-field textarea"
);
const allDropdownBlocksInput = document.querySelectorAll(
  ".dropdown-block input"
);
const allDropdownBlocksTextarea = document.querySelectorAll(
  ".dropdown-block textarea"
);

const allFormFields = [
  ...allContactFieldsInputs,
  ...allContactFieldsTextarea,
  ...allDropdownBlocksInput,
  ...allDropdownBlocksTextarea,
];
console.log(allFormFields);

allFormFields.forEach((item) => {
  const fieldLabel = document.querySelector(`[for=${item.id}]`);

  item.addEventListener("input", ({ target }) => {
    if (target.value.length < 1) {
      fieldLabel.classList.remove("active");
    } else {
      fieldLabel.classList.add("active");
    }
  });
});



