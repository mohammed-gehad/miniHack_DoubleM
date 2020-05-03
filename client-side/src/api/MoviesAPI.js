const axios = require("axios");
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "https://7c519ba4.ngrok.io",
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.token = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
