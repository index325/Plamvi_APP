import axios from "axios";
import constants from "../config/constants";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-community/async-storage";

const _getUserToken = async () => {
  try {
    let userToken = (await AsyncStorage.getItem("@Auth:token")) || false;
    return userToken;
  } catch (error) {
    // Error saving data
  }
};

export async function getCartService() {
  let token = await _getUserToken();

  try {
    const apiData = await axios({
      method: "get",
      url: `${constants.API_URL}/carts/verify`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(apiData.data)
    return apiData.data;
  } catch (error) {
    showMessage({
      message: "Oops!",
      description: error.response.data.error,
      type: "danger",
      position: "bottom",
      floating: true,
    });
  }
}

export async function addProductToCartService(
  quantidade: number,
  produto: number
) {
  let token = await _getUserToken();
  let apiData;
  console.log(produto)
  await axios({
    method: "post",
    url: `${constants.API_URL}/carts/add_to_cart`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    data: {
      quantity: quantidade,
      product_id: produto,
    },
  })
    .then(function (response) {
      apiData = response.data.cart_item;
      showMessage({
        message: "Sucesso!",
        description: response.data.success,
        type: "success",
        position: "bottom",
        floating: true,
      });
    })
    .catch(function (error) {
      showMessage({
        message: "Oops!",
        description: error.response.data.error,
        type: "danger",
        position: "bottom",
        floating: true,
      });
    });
    console.log(apiData)
    return 
  return apiData;
}
