import http from './base-http-service';
import { constants } from '../utils/constants';

let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

// const getUser = async idToken => {
//   try {
//     const responseUser = await http.get('/user/me', {
//       headers: {
//         Authentication: idToken,
//         'Content-Type': 'application/json'
//       }
//     });
//     userLocal = await JSON.stringify(responseUser.data);
//     localStorage.setItem(constants.CURRENT_USER_KEY, userLocal);
//     return userLocal;
//   } catch (error) {
//     throw error;
//   }
// };

const authenticate = async () => {
  try {
    const response = await http.get('/twitter');
    console.log(response)
    if (response.data) {
      userLocal = await JSON.stringify(response.data);
      localStorage.setItem(constants.CURRENT_TOKEN_KEY, userLocal);
      return userLocal;
    } else {
      throw response;
    }
  } catch (error) {
    throw error;
  }
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
