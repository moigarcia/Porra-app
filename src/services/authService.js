import http from "./base-http-service";
import { constants } from "../utils/constants";

let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

const authenticate = () => {
  fetch("https://porra-api.herokuapp.com/auth/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(response => {
      if (response.status === 200) return response.json();
      throw new Error("failed to authenticate user");
    })
    .then(responseJson => {
      localStorage.setItem(
        constants.CURRENT_USER_KEY,
        JSON.stringify(responseJson)
      );
      return JSON.stringify(responseJson);
    })
    .catch(error => {
      console.log("error por authservice")
      throw error;
    });
};

const logout = () => {
  userLocal = {};
  localStorage.removeItem(constants.CURRENT_USER_KEY);
  http.get('/logout')
  return userLocal;
};

export default {
  authenticate,
  logout
};
