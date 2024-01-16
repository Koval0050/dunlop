import "./index.scss";

export const customSelectFunc = (className) => {
  const customSelect = document.querySelector(className);
  const headCustomSelect = customSelect.querySelector(".custom-select__head");
  const inputHeadCustomSelect = headCustomSelect.querySelector("input");

  const toogleSelect = () => {
    customSelect.classList.toggle("active");
  };

  const closeSelect = () => {
    customSelect.classList.remove("active");
  };

  customSelect.addEventListener("click", ({ target }) => {
    const allListItems = customSelect.querySelectorAll(
      ".custom-select__list-item"
    );
    const listItem = target.closest(".custom-select__list-item");

    if (target.closest(".custom-select__head")) {
      toogleSelect();
    }

    if (listItem) {
      allListItems.forEach((item) => {
        item.classList.remove("active");
      });

      inputHeadCustomSelect.value = listItem.textContent;
      inputHeadCustomSelect.dataset.listItemId = listItem?.id;
      listItem.classList.add("active");
      closeSelect();
    }
  });

  document.addEventListener("click", (e) => {
    const path = e?.path || (e?.composedPath && e?.composedPath());

    if (!path.includes(customSelect)) {
      closeSelect();
    }
  });
};
