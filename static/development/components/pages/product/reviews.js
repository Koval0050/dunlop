import { addProductReview } from "../../../api/reviews";
import { validationBtn } from "../../module/validation";

validationBtn(".form-write-review");

const modalWindow = document.querySelector(".write-review-modal");
const writeReviewForm = document.querySelector(".form-write-review");
const allFormFields = writeReviewForm.querySelectorAll(".form__field-input");

const formState = {};

const getFormData = () => {
  allFormFields.forEach((item) => {
    formState[item.id] = item.value;
  });

  return {
    full_name: `${formState.firstName} ${formState.lastName}`,
    phone: formState.tel,
    email: formState.email,
    product: writeReviewForm.dataset.productId,
    rating: formState.rating || 60,
    text: formState.comment,
  };
};



//change rating
const starRating = writeReviewForm.querySelector(".star-rating-clickable");
starRating.addEventListener("click", ({ target }) => {
  if (target.checked) {
    formState.rating = target.value;
  }
});

//send form
const sendBtn = writeReviewForm.querySelector(".write-review-modal__send-btn");
sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = getFormData();
  await addProductReview(formData, () => {
    modalWindow.closest(".overlay").classList.remove("active");
    modalWindow.classList.remove("active");
    writeReviewForm.reset();
  });
});
