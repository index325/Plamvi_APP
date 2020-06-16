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

export async function createOrder() {
  let apiData;
  const token = await _getUserToken();
  await axios({
    method: "get",
    url: constants.API_USER_URL + "/create_order",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      apiData = response.data;
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

  return apiData;
}
