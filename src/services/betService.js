import http from "./base-http-service";
import { constants } from "../utils/constants";

// let userLocal = localStorage.getItem(constants.CURRENT_USER_KEY);

const doBet = async (id, bet) => { 
  try {
    const response = await http.post(`/days/${id}/bets`, bet)
    console.log(response)
    const result = response.data
    return result
   
  } catch(error){
    throw error
  }
}
const getBetActually = async (id, bet) => { 
  try {
    const response = await http.post(`/days/${id}/bets/user`, bet)
    console.log(response)
    const result = response.data
    return result
   
  } catch(error){
    throw error
  }
}

export default {
  doBet,
  getBetActually
};
