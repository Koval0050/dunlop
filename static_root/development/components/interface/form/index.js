import "./index.scss";

let field_inputs = document.querySelectorAll(".input__wrap");
if (field_inputs.length > 0) {
  field_inputs.forEach((element) => {
    let input = element.querySelector(".input");
    let length = input;

    if (input) {
      input.addEventListener("focus", function () {
        element.classList.add("active");
      });
      input.addEventListener("blur", function () {
        if (this.value.length < 1) {
          element.classList.remove("active");
        }
      });

      if (length > 1) {
        input.classList.add("active");
      } else {
        input.classList.remove("active");
      }
    }
  });

  // $('.form__group_label').on('click', function () {
  //     $(this).parents('.input').toggleClass('in-focus')
  // })
  // console.log(field_inputs);

  // for (const key in field_inputs) {
  //     if (field_inputs.hasOwnProperty(key) && typeof field_inputs[key] == 'object') {
  //         let input = field_inputs[key];

  //     }
  // }
}
