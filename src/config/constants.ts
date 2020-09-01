import { Platform } from "react-native";

const constants: any = {
  IS_ENV_DEVELOPMENT: __DEV__,
  IS_ANDROID: Platform.OS === "android",
  IS_IOS: Platform.OS === "ios",
  IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent),
  API_URL: "http://10.0.2.2:3333",
  API_CLIENT_URL: "http://192.168.15.10:3001/api/cliente",
  ICONS_SIZE: 20,
};

export default constants;
