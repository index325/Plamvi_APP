import axios from 'axios';
import constants from '../config/constants';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

const _getUserToken = async () => {
  try {
    let userToken = (await AsyncStorage.getItem('@Auth:token')) || false;
    return userToken;
  } catch (error) {
    // Error saving data
  }
};

export async function getCartService() {
  let token = await _getUserToken();
  let apiData;
  await axios({
    method: 'get',
    url: constants.API_USER_URL + '/verificar_carrinho',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function(response) {
      apiData = response.data.result.itensCarrinho;
    })
    .catch(function(error) {
      showMessage({
        message: 'Oops!',
        description: error.response.data.error,
        type: 'danger',
        position: 'bottom',
        floating: true,
      });
    });
  return apiData;
}

export async function addProductToCartService(quantity, product) {
  let token = await _getUserToken();
  let apiData;
  await axios({
    method: 'post',
    url: constants.API_USER_URL + '/adicionar_ao_carrinho',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    data: {
      quantity,
      product,
    },
  })
    .then(function(response) {
      apiData = response.data.carrinho.itensCarrinho;
    })
    .catch(function(error) {
      showMessage({
        message: 'Oops!',
        description: error.response.data.error,
        type: 'danger',
        position: 'bottom',
        floating: true,
      });
    });
  return apiData;
}
