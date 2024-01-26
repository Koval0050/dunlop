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
const allContactFieldsInputs = document.querySelectorAll(".form__field-input");

allContactFieldsInputs.forEach((item) => {
  const inputsLabel = document.querySelector(`[for=${item.id}]`);

  item.addEventListener("input", ({ target }) => {
    if (target.value.length < 1) {
      inputsLabel.classList.remove("active");
    } else {
      inputsLabel.classList.add("active");
    }
  });
});


//цю функцію я скопіпастив бо без неї в консольці сипались помилки а де її використовувати на практиці я не знайшов. Сорі)
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