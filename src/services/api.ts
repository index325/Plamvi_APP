import axios from "axios";
import constants from "../config/constants";

const api = axios.create({
  baseURL: constants.API_USER_URL,
});

export default api;
