import { instance } from "./instance";
import { renderSelectItems } from "../components/pages/order/form";
import { openThanksPopUp } from "../components/pages/order";
import { bad_modal } from "../components/module/form_action";

export async function sendOrder(formData) {
  try {
    document.querySelector(".modal_loading__block").classList.add("active");

    const { data } = await instance.post("/api/make_order/", formData);

    if (data?.url === "/payment/") {
      window.location.href = data.url;
    } else {
      openThanksPopUp();
    }

    return data;
  } catch (error) {
    console.log(error);

    bad_modal(error?.response?.data?.detail);
  }
}

export async function getCities(city) {
  try {
    const { data } = await instance.get(`/api/settlements/?q=${city}`);

    renderSelectItems(data.results, ".select-city");
    return data?.results;
  } catch (error) {
    console.log(error);
  }
}

export async function getDepartments(department) {
  try {
    const { data } = await instance.get(`/api/warehouses/?q=${department}`);

    renderSelectItems(data, ".select-department");
    return data;
  } catch (error) {
    console.log(error);
  }
}