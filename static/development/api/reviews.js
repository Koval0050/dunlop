import { instance } from "./instance";
import { accept_modal, bad_modal } from "../components/module/form_action";

const API_URL_REVIEW = "/api/review/";

export async function addProductReview(data, callback) {
  try {
    await instance.post(API_URL_REVIEW, data);

    callback();
    accept_modal();
  } catch (error) {
    console.log(error);
    bad_modal(error);
  }
}
