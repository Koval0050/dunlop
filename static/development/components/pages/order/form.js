import { customSelectFunc } from "../../module/custom_select";
import { getCities, getDepartments } from "../../../api/order";
import { sendOrder } from "../../../api/order";

const orderForm = document.querySelector(".order__form");

if (orderForm) {
  customSelectFunc(".select-city");
  customSelectFunc(".select-department");

  getCities("а");
}

//Перенесення лейблу при введені тексту
function moveInputsLabel(target, inputsLabel) {
  if (target.value.length < 1) {
    inputsLabel.classList.remove("active");
  } else {
    inputsLabel.classList.add("active");
  }
}

function addInputListeners(inputs) {
  inputs.forEach((item) => {
    const inputsLabel = document.querySelector(`[for=${item.id}]`);

    // Перевірка наявності атрибуту readonly перед його видаленням
    if (item.hasAttribute("readonly")) {
      item.removeAttribute("readonly");
    }

    item.addEventListener("input", (e) => {
      moveInputsLabel(e.target, inputsLabel);
    });
  });
}

if (orderForm) {
  const allContactFieldsInputs =
    document.querySelectorAll(".form__field-input");
  addInputListeners(allContactFieldsInputs);

  const allOrderFieldsInputs = document.querySelectorAll(".validation_input");
  addInputListeners(allOrderFieldsInputs);

  const allOrderFieldsTextArea = document.querySelectorAll(
    ".form__delivery-checkbox textarea"
  );
  addInputListeners(allOrderFieldsTextArea);
}

// Слухач для відстеження способу доставки
if (orderForm) {
  const allDeliveryCheckbox = document.querySelectorAll(
    ".form__delivery-checkbox input[type='radio']"
  );

  allDeliveryCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      // Знімаємо клас "active" з усіх елементів
      allDeliveryCheckbox.forEach((el) => {
        const inputField = el
          .closest(".form__delivery-checkbox")
          .querySelector("input[type='text'], textarea");
        // Перевіряємо, чи поле введення існує і чи не є воно поточним полем введення
        if (inputField && el !== checkbox) {
          inputField.classList.remove("validation_input");
        }
        el.closest(".form__delivery-checkbox").classList.remove("active");
      });

      // Додаємо клас "active" тільки для вибраного елемента
      this.closest(".form__delivery-checkbox").classList.add("active");

      // Отримуємо поле введення залежно від обраного способу доставки
      const inputField = this.closest(".form__delivery-checkbox").querySelector(
        "input[type='text'], textarea"
      );

      // Додаємо клас "validation_input" до поля введення, якщо воно є
      if (inputField) {
        inputField.classList.add("validation_input");
      }
    });
  });
}

//Слухач для відстеження способу оплати
let payment_type = document.getElementById("cash-payment");

if (orderForm) {
  const allPaymentType = document.querySelectorAll(
    ".form__payment-checkbox input"
  );

  allPaymentType.forEach((item) => {
    item.addEventListener("click", () => {
      payment_type = item.id;
    });
  });
}

//формуємо дані для замовлення
function createFormData() {
  //Усуває баг з відправкою обєкта
  if (typeof payment_type !== "string") {
    payment_type = payment_type.id;
  }
  const formData = {
    name: document.getElementById("firstName").value,
    surname: document.getElementById("lastName").value,
    phone: document.getElementById("tel").value,
    email: document.getElementById("email").value,
    settlement: document.querySelector("#city input").dataset.listItemId || "",
    warehouse:
      document.querySelector("#department input").dataset.listItemId || "",
    address: document.getElementById("address").value || "",
    message: document.getElementById("message").value || "",
    payment_type,
  };
  return formData;
}

function validateForm() {
  const isError =
    checkValidation(".form__part-contacts") ||
    checkValidation(".form__part-delivery .form__delivery-checkbox") ||
    checkValidation(".form__part-payment");
  return isError;
}

function checkValidation(selector) {
  const field = document.querySelector(selector);
  if (field && field.querySelector(".validation_error")) {
    return true;
  }
  return false;
}

if (orderForm) {
  // Відправка замовлення
  const submitBtn = document.querySelector(".summary__confirm-btn");
  submitBtn.addEventListener("click", () => {
    const data = createFormData();
    const isError = validateForm();

    if (!isError) {
      console.log("send order - ", data);
      sendOrder(data);
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
