import http from "./base-http-service";
import { constants } from "../utils/constants";

let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

const authenticate = () => {
    http
      .get("/auth/login/success")
      .then(response => {
        if (response.data) {
          console.log("responseJson ", response);
          localStorage.setItem(
            constants.CURRENT_USER_KEY,
            JSON.stringify(response.data)
          );
          return JSON.stringify(response.data);
        }
      })
      .catch(error => {
        throw error;
      });
};

const getUserById = async id => {
  try {
    const response = await http.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logOut = () => {
  //fetch("https://porra-api.herokuapp.com/auth/logout", {
  fetch("http://localhost:3001/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(response => {
      userLocal = {};
      localStorage.removeItem(constants.CURRENT_USER_KEY);
      return userLocal;
    })
    .catch(error => {
      throw error;
    });
};


export default {
  authenticate,
  getUserById,
  logOut
};
