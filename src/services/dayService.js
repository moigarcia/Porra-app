import http from "./base-http-service";
import { constants } from "../utils/constants";

// let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

const getDayActually = async () => { 
  try {
    const response = await http.get('/days')
    const result = response.data.filter( n => n.stateDay === 'open')
    return result
   
  } catch(error){
    throw error
  }
}

export default {
  getDayActually
};
