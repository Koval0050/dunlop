import { instance } from "./instance";
import {
  toggleCartMark,
  renderCartItems,
  updateCartTotalPrice,
} from "../components/common_componentc/header/cart";
import { updateOrder } from "../components/pages/order";

const API_URL_CART = "/api/cart_product/";

export async function addToCart(obj) {
  try {
    const { data } = await instance.post(API_URL_CART, obj);

    toggleCartMark(data.cart_products);
    renderCartItems(data.cart_products);
    updateCartTotalPrice(data.total_price);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCartItem(id, obj) {
  try {
    const { data } = await instance.patch(`${API_URL_CART}${id}/`, obj);

    toggleCartMark(data.cart_products);
    renderCartItems(data.cart_products);
    updateCartTotalPrice(data.total_price);
    updateOrder(data.total_quantity, data.total_price, data.cart_products);
  } catch (error) {
    console.log(error);
  }
}

export async function removeCartItem(id) {
  try {
    const { data } = await instance.delete(`${API_URL_CART}${id}/`);

    toggleCartMark(data.cart_products);
    renderCartItems(data.cart_products);
    updateCartTotalPrice(data.total_price);
    updateOrder(data.total_quantity, data.total_price, data.cart_products);
  } catch (error) {
    console.log(error);
  }
}
