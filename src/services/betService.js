import http from "./base-http-service";

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
    return response.data
  } catch(error){
    throw error
  }
}

export default {
  doBet,
  getBetActually
};
