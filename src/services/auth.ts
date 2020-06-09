import axios from 'axios';
import constants from '../config/constants';
import {showMessage} from 'react-native-flash-message';

export async function SignInService(email: string, password: string) {
  let apiData;
  await axios({
    method: 'post',
    url: constants.API_USER_URL + '/login',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    data: {
      email,
      password,
    },
  })
    .then(function(response) {
      apiData = response.data;
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
