import { customSelectFunc } from "../../module/custom_select";
import { getCities, getDepartments } from "../../../api/order";
import { sendOrder } from "../../../api/order";
import { purchaseGT } from "../../module/googleTagEvents/googleTagEvents";

const orderForm = document.querySelector(".order__form");

if (orderForm) {
  customSelectFunc(".select-city");
  customSelectFunc(".select-department");

  getCities("а");
}

// При кількості символів > 0 переносить label у верх поля, а при кількості символів === 0, переносить лейбел у центр поля вводу
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

// При валідаційній помилці, будь якого поля, додає для кнопки форми "Замовлення підтверджую" стан disabled

const confirmBtn = document.querySelector(".summary__confirm-btn");
const reCaptchaContainer = document.querySelector(".g-recaptcha-wrapper");

const checkFormErrors = () => {
  const reCaptchaError = document.querySelector(".g-recaptcha-error");
  const isValidateReCaptcha = reCaptchaContainer?.dataset?.res;

  const allValidationError = orderForm?.querySelectorAll(".validation_error");
  const isError = allValidationError?.length || !isValidateReCaptcha;

  if (confirmBtn) {
    if (isError) {
      confirmBtn.setAttribute("disabled", "");
    } else {
      confirmBtn.removeAttribute("disabled");
    }
  }

  if (reCaptchaError) {
    if (!isValidateReCaptcha) {
      reCaptchaError.classList.add("active");
    } else {
      reCaptchaError.classList.remove("active");
    }
  }
};

setInterval(() => {
  if (reCaptchaContainer && reCaptchaContainer.dataset.res) {
    checkFormErrors();
  }
}, 500);

if (orderForm) {
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      checkFormErrors();

      if (!confirmBtn.disabled) {
        sendOrderFunc();
      }
    });
  }

  allFormFields.forEach((item) =>
    item.addEventListener("input", checkFormErrors)
  );

  allFormFields.forEach((item) =>
    item.addEventListener("blur", checkFormErrors)
  );
}

// видалення атрибуту readonly (додано, для виправлення бага автозаповнення, коли label та текст пересікаються)
setTimeout(
  () => allFormFields.forEach((item) => item.removeAttribute("readonly")),
  1000
);

// dropdown block for checkboxes
if (orderForm) {
  orderForm.addEventListener("click", ({ target }) => {
    const checkIsActiveCheckboxes = () => {
      const allDeliveryCheckboxes = orderForm.querySelectorAll(
        ".form__checkbox-wrapper input"
      );

      allDeliveryCheckboxes.forEach((item) => {
        const formCheckbox = item.closest(".form__checkbox");
        const dropdownBlockInput = formCheckbox.querySelector(
          ".dropdown-block input"
        );
        const dropdownBlockTextarea = formCheckbox.querySelector("textarea");
        const validationError = formCheckbox.querySelector(".validation_error");

        if (!item.checked) {
          formCheckbox.classList.remove("active");

          if (validationError) {
            validationError.remove();
            checkFormErrors();
          }

          if (dropdownBlockInput) {
            dropdownBlockInput.classList.remove("validation_input");
          }

          if (dropdownBlockTextarea) {
            dropdownBlockTextarea.classList.remove("validation_input");
          }
        }
      });
    };

    if (
      target.closest(".form__checkbox-wrapper") &&
      target.tagName !== "LABEL"
    ) {
      const formCheckbox = target.closest(".form__checkbox");
      const dropdownBlockInput = formCheckbox.querySelector(
        ".dropdown-block input"
      );
      const dropdownBlockTextarea = formCheckbox.querySelector("textarea");

      formCheckbox.classList.add("active");

      if (dropdownBlockInput) {
        dropdownBlockInput.classList.add("validation_input");
      }

      if (dropdownBlockTextarea) {
        dropdownBlockTextarea.classList.add("validation_input");
      }

      checkIsActiveCheckboxes();
    }
  });
}

// render select items, отримання міст та відділень та їх додаванно до списку
const renderSelectItem = ({ id, title }) => {
  return `<li id=${id} class="custom-select__list-item">${title}</li>`;
};

export const renderSelectItems = (items, classNameSelect) => {
  const select = document.querySelector(classNameSelect);
  const selectList = select.querySelector(".custom-select__list");
  const newSelectItems = items?.map((item) => renderSelectItem(item));

  if (newSelectItems) {
    selectList.innerHTML = newSelectItems.join("");
  } else {
    selectList.innerHTML = "";
  }
};

if (orderForm) {
  const selectCity = orderForm.querySelector(".select-city");
  const selectCityInput = selectCity.querySelector("input");

  selectCityInput.addEventListener("input", ({ target }) =>
    getCities(target.value)
  );

  selectCity.addEventListener("click", ({ target }) => {
    if (target.closest(".custom-select__list-item")) {
      getDepartments(target.id);
    }
  });

  const selectDepartment = orderForm.querySelector(".select-department");
  const selectDepartmentInput = selectDepartment.querySelector("input");

  selectDepartmentInput.addEventListener("input", async ({ target }) => {
    const resetExtraSymbols = (str) => {
      return str
        .toLocaleLowerCase()
        .replaceAll("нова пошта", "")
        .replaceAll("вулиця", "")
        .replaceAll("вул", "")
        .replaceAll("№", "")
        .replaceAll('"', "")
        .replaceAll(":", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(".", "")
        .replaceAll(",", "")
        .replaceAll(" ", "");
    };

    const searchValue = resetExtraSymbols(target.value);

    const departments = await getDepartments(
      selectCityInput.dataset.listItemId
    );

    const filteredDepartments = departments.filter((item) => {
      const itemTitle = resetExtraSymbols(item.title);

      return itemTitle.includes(searchValue);
    });

    renderSelectItems(filteredDepartments, ".select-department");
  });
}

// send order
function getFormState() {
  const city = document.getElementById("city");
  const department = document.getElementById("department");
  let payment_type = document.querySelector(
    ".form__payment-checkbox label span span"
  ).textContent;

  const updatePaymentType = () => {
    const allPaymentCheckboxes = orderForm.querySelectorAll(
      ".form__payment-checkbox"
    );

    allPaymentCheckboxes.forEach((item) => {
      if (item.querySelector("input").checked) {
        payment_type = item.querySelector("label span span").textContent;
      }
    });
  };

  updatePaymentType();

  const formState = {
    name: document.getElementById("firstName").value,
    surname: document.getElementById("lastName").value,
    phone: document.getElementById("tel").value,
    email: document.getElementById("email").value,
    settlement: city.querySelector("input").dataset.listItemId,
    warehouse: department.querySelector("input").dataset.listItemId,
    address: document.getElementById("address").value,
    message: document.getElementById("message").value,
    payment_type,
  };

  return formState;
}

async function sendOrderFunc() {
  const { id, total_price, cart } = (await sendOrder(getFormState())) || {};

  const items = cart?.cart_products.map(
    ({ product, total_price, quantity }) => ({
      item_name: product.title,
      item_id: product.id,
      item_price: total_price,
      item_quantity: quantity,
    })
  );

  purchaseGT({ transaction_id: id, value: total_price, items });
}
