import http from "./base-http-service";

const getDayActually = async () => {
  try {
    const response = await http.get("/days");
    const result = response.data.filter(n => n.stateDay !== "closed");
    return result[0] || null
  } catch (error) {
    throw error;
  }
};
const getClassification = async () => {
  try {
    const response = await http.get("/users/classification");
    return response.data
  } catch (error) {
    throw error;
  }
};

const pendingDay = async id => {
  try {
    const response = await http.put(`/days/${id}`, { stateDay: "pending" });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updatingDaySubmit = async (id, day) => {
  try{
    const response = await http.put(`/days/${id}`, day)
    console.log(response)
    return response
  } catch(error) {
    throw error
  }
}
const creatingDaySubmit = async (day) => {
  try{
    const response = await http.post('/days', day)
    console.log(response)
    return response
  } catch(error) {
    throw error
  }
}
const closeDaySubmit = async (id) => {
  try{
    const response = await http.post(`/days/${id}/bets/check`)
    console.log(response)
    return response
  } catch(error) {
    throw error
  }
}

export default {
  creatingDaySubmit,
  getDayActually,
  pendingDay,
  closeDaySubmit,
  updatingDaySubmit,
  getClassification
};
