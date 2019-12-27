import http from "./base-http-service";
import { constants } from "../utils/constants";

let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

const authenticate = () => {
  fetch("http://localhost:3001/auth/login/success", {
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
      throw error;
    });
};
const getUserById = async (id) => { 
  try {
    const response = await http.get(`/users/${id}`)
    return response.data
  } catch(error){
    throw error
  }
}

const logOut = () => {
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
      console.log("entra")
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
