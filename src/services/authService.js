import http from "./base-http-service";
import { constants } from "../utils/constants";

let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

// const getUser = async idToken => {
//   try {
//     const responseUser = await http.get('/user/me', {
//       headers: {
//         Authentication: idToken,
//         'Content-Type': 'application/json'
//Accept: "application/json",
//     "Access-Control-Allow-Credentials": true
//       }
//     });
//     userLocal = await JSON.stringify(responseUser.data);
//     localStorage.setItem(constants.CURRENT_USER_KEY, userLocal);
//     return userLocal;
//   } catch (error) {
//     throw error;
//   }
// };

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
        constants.CURRENT_TOKEN_KEY,
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
  return userLocal;
};

export default {
  authenticate,
  logout
};
